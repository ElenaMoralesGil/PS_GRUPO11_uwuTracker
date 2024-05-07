const User = require(process.cwd() + '/schemas/User.schema.js')

const  { deleteDoc, setDoc, Firestore, doc, arrayUnion, getDoc, addDoc, query,getDocs, updateDoc, and, or, collection, where}  = require('firebase/firestore/lite')
const {  ref, uploadBytes, getDownloadURL, FirebaseStorage} = require('firebase/storage');


class FirebaseUsers {
    #fss
    #collection
    #storage
    constructor() {
        this.#fss = require('./firebase.service')
        this.#collection = 'Users'
        this.#storage =  FirebaseStorage
    }

    get #db() {
        return this.#fss.db
    }

    get #coll() {
        return this.#collection
    }

    findById = id => getDoc(doc(this.#db, this.#coll, `${id}`)).then(doc => doc.data()).then(data => data ? User.parse(data) : null)

    find = (queryObj, opt = 'OR') => {

        const constrains = []
        for (let [key, val] of Object.entries(queryObj))
            constrains.push(where(String(key), '==', val))

        return getDocs(query(collection(this.#db, this.#coll), opt === 'OR' ? or(...constrains) : and(...constrains)))
            .then(res => res.docs.length ? res.docs.map(elm => User.parse(elm.data())) : null)
    }

    findOne = (queryObj, opt = 'OR') => {

        const constrains = []
        for (let [key, val] of Object.entries(queryObj))
            constrains.push(where(String(key), '==', val))

        return getDocs(query(collection(this.#db, this.#coll), opt === 'OR' ? or(...constrains) : and(...constrains)))
            .then(res => res.docs.length ? User.parse(res.docs[0].data()) : null)
    }

    create = async user => {

        if (await this.find({username: user.username, email: user.email}, 'OR')) return null

        const userRef = await addDoc(collection(this.#db, this.#coll), user.get())
        await updateDoc(doc(this.#db, this.#coll, userRef.id), {id: userRef.id})

        return {...user, id: userRef.id}
    }

    update = async ({id, userProps}) => {
        if (!await this.findById(id)) return false

        await updateDoc(doc(this.#db, this.#coll, id), userProps)

        return true
    }
    checkOnList = async (contentId, nameList, userId) => {
        try {
            const userDoc = await getDoc(doc(this.#db, this.#coll, userId));
            if (!userDoc.exists()) {
                console.log('User not found');
                return false;
            }

            const userData = userDoc.data();
            const listField = userData[nameList];
            if (!Array.isArray(listField)) {
                console.log('Invalid list field or it does not contain an array');
                return false;
            }

            return listField.includes(contentId);
        } catch (error) {
            console.error('Error checking content on list:', error);
            return false;
        }
    }
    trackingList = async (userId, contentId, newListName) => {
        console.log(`Moving ${contentId} to ${newListName} list`);
        try {
            const userRef = doc(this.#db, this.#coll, userId);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                console.log('User not found');
                return false;
            }

            const userData = userDoc.data();

            // Get the name of the current list if the contentId is already in a list
            const currentListName = await this.isOnList(userId, contentId);

            // Remove contentId from the current list if it exists
            if (currentListName && userData[currentListName]) {
                const updatedList = userData[currentListName].filter(item => item !== contentId);
                await updateDoc(userRef, {[currentListName]: updatedList});
            }

            // Add contentId to the new list
            const updatedList = [...userData[newListName], contentId];
            await updateDoc(userRef, {[newListName]: updatedList});
            if (newListName === "watching") {
                const contentProgress = userData.contentProgress;
                if (!contentProgress.hasOwnProperty(contentId)) {
                    contentProgress[contentId] = 0;
                    await updateDoc(userRef, {contentProgress});
                }
            }
            console.log('Content moved to the new list successfully');
            return true;
        } catch (error) {
            console.error('Error moving content to the new list:', error);
            return false;
        }
    }
    isOnList = async (userId, contentId) => {
        const userRef = doc(this.#db, this.#coll, userId);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
        const trackingLists = ['completed', 'planToWatch', 'dropped', 'watching'];
        for (const listName of trackingLists) {
            if (userData.hasOwnProperty(listName) && Array.isArray(userData[listName])) {
                const list = userData[listName];
                if (list.includes(contentId)) {
                    console.log("list name", listName)
                    return listName;
                }
            }
        }
        return null;
    }

    getContentsFromList = async (userId, listField) => {
        try {
            const userDoc = await getDoc(doc(this.#db, this.#coll, userId));
            if (!userDoc.exists()) {
                console.log('User not found');
                return null;
            }

            const userData = userDoc.data();
            let references;
            let userScores;
            let contentProgress;
            if (listField) {
                references = userData[listField];
                if (!Array.isArray(references)) {
                    console.log('Invalid list field or it does not contain an array');
                    return null;
                }
                userScores = userData["userScores"]
                contentProgress = userData["contentProgress"];

                const contentMap = {};

                if (references) {
                    for (const reference of references) {
                        try {
                            const contentDoc = await getDoc(doc(this.#db, 'Contents', reference));
                            const score = userScores[reference] || '-';
                            const progress = contentProgress[reference] || 0;
                            if (contentDoc.exists()) {
                                const contentData = contentDoc.data();
                                contentMap[reference] = {
                                    coverImg: contentData.coverImg,
                                    title: contentData.title,
                                    score: contentData.score,
                                    status: contentData.status,
                                    type: contentData.type,
                                    year: contentData.year,
                                    userScore: score,
                                    genres: contentData.genres,
                                    contentProgress: progress,
                                    episodes: contentData.episodes
                                };
                            } else {
                                console.log(`Content with reference ${reference} not found`);
                            }
                        } catch (error) {
                            console.error(`Error processing reference ${reference}:`, error);
                        }
                    }
                }

                return contentMap;
            }
        } catch (error) {
            console.error('Error getting contents from list:', error);
            return null;
        }
    }
    incrementEpisodesCount = async (userId, contentId) => {
        try {
            const userRef = doc(this.#db, this.#coll, userId);
            const userDoc = await getDoc(userRef);

            const contentDoc = await getDoc(doc(this.#db, 'Contents', contentId));
            const contentData = contentDoc.data();
            const maxCount = contentData.episodes;

            if (!userDoc.exists) {
                throw new Error('User not found');
            }

            const userData = userDoc.data();
            const contentProgress = userData.contentProgress;
            const episodesCount = contentProgress[contentId];
            if (episodesCount === maxCount) {
                return episodesCount;
            } else {
                contentProgress[contentId] = episodesCount + 1;
                await updateDoc(userRef, {contentProgress});
                return contentProgress[contentId];
            }
        } catch (error) {
            console.error('Error incrementing episodes count:', error);
            throw error;
        }
    }

    decrementEpisodesCount = async (userId, contentId) => {
        try {
            const userRef = doc(this.#db, this.#coll, userId);
            const userDoc = await getDoc(userRef);

            const userData = userDoc.data();
            const contentProgress = userData.contentProgress;
            const episodesCount = contentProgress[contentId];
            if (episodesCount === 0) {
                return episodesCount;
            } else {
                contentProgress[contentId] = episodesCount - 1;
                await updateDoc(userRef, {contentProgress});
                return contentProgress[contentId];
            }
        } catch (error) {
            console.error('Error incrementing episodes count:', error);
            throw error;
        }
    }


    checkUserExistance = async (username) => {
        const usernameQuery = query(collection(this.#db, this.#coll), where("username", "==", username));

        const [usernameDocs] = await Promise.all([
            getDocs(usernameQuery),
        ]);

        return (!usernameDocs.empty)
    }
    checkEmailExistence = async (email) => {

        const emailQuery = query(collection(this.#db, this.#coll), where("email", "==", email));

        const [emailDocs] = await Promise.all([
            getDocs(emailQuery),
        ]);

        return (!emailDocs.empty)

    }

    async modifyUserDetails(uid, username, email, description) {

        const userRef = doc(this.#db, this.#coll, uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists) {
            throw new Error('User not found');
        }

        const userData = userDoc.data() || {};

        const usernameData = userData['username'] || '';
        const descriptionData = userData['description'] || '';
        const emailData = userData['email'] || '';

        const updates= {};
        if (usernameData !== username) {
            updates.username = username;
        }
        if (descriptionData !== description) {
            updates.description = description;
        }
        if(emailData !== email) {
            updates.email = email;
        }

        if (Object.keys(updates).length > 0) {
            try {
                await updateDoc(userRef, updates);
                return true;
            } catch (error) {
                console.error('Error updating user details:', error);
                throw error;
            }
        }
        return true;
    }
    async updateProfilePicture(userId, profileImage) {
        if (!profileImage) return Promise.reject(new Error('No image provided'));

        try {

            const storageRef = ref(this.#storage, `profilePictures/${userId}`);

            const snapshot = await uploadBytes(storageRef, profileImage);

            const downloadURL = await getDownloadURL(snapshot.ref);

            const userRef = doc(this.#db, this.#coll, userId);
            await updateDoc(userRef, { profilePicture: downloadURL });

            return downloadURL;
        } catch (error) {
            console.error('Error updating profile picture:', error);
            throw error;
        }
    }

    async deleteAccount(userId) {
        try {

            await deleteDoc(doc(this.#db, this.#coll, userId));
            console.log("User document deleted successfully");
        } catch (error) {
            console.error("Error deleting user document:", error);
            throw error;
        }
    }

}


module.exports = require('../../bin/Singleton')(new FirebaseUsers())