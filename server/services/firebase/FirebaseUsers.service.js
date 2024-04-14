const User = require(process.cwd() + '/schemas/User.schema.js')

const { collection, doc, arrayUnion, getDoc, addDoc, query, where, getDocs, updateDoc, and, or } = require('firebase/firestore/lite')


class FirebaseUsers {
    #fss
    #collection
    constructor() {
        this.#fss = require('./firebase.service')
        this.#collection = 'Users'
    }

    get #db() { return this.#fss.db }
    get #coll() { return this.#collection }

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


        if (await this.find({ username: user.username, email: user.email }, 'OR')) return null

        const userRef = await addDoc(collection(this.#db, this.#coll), user.get())
        await updateDoc(doc(this.#db, this.#coll, userRef.id), { id: userRef.id })

        return { ...user, id: userRef.id }
    }

    update = async ({ id, userProps }) => {
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

            // Check if the contentId is already in the new list
            if (userData.hasOwnProperty(newListName) && Array.isArray(userData[newListName])) {
                const newList = userData[newListName];
                if (newList.includes(contentId)) {
                    console.log('Content already exists in the new list');
                    return true;
                }
            }

            const trackingLists =['completed', 'planToWatch', 'dropped', 'watching'];

            // Iterate through tracking lists to remove contentId if exists
            for (const listName of trackingLists) {
                if (userData.hasOwnProperty(listName) && Array.isArray(userData[listName])) {
                    const list = userData[listName];
                    if (list.includes(contentId)) {
                        const updatedList = list.filter(item => item !== contentId);
                        await updateDoc(userRef, { [listName]: updatedList });
                        break;
                    }
                }
            }

            // Add contentId to the new list
            if (userData.hasOwnProperty(newListName) && Array.isArray(userData[newListName])) {
                const newList = userData[newListName];
                const updatedList = [...newList, contentId];
                await updateDoc(userRef, { [newListName]: updatedList });
            }

            console.log('Content moved to the new list successfully');
            return true;

        } catch (error) {
            console.error('Error moving content to the new list:', error);
            return false;
        }
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
            if (listField) {
                references = userData[listField];
                if (!Array.isArray(references)) {
                    console.log('Invalid list field or it does not contain an array');
                    return null;
                }
                userScores = userData["userScores"]

            const contentMap = {};

            if (references) {
                for (const reference of references) {
                    try {
                        const contentDoc = await getDoc(doc(this.#db, 'Contents', reference));
                        const score = userScores[reference] || '-';
                        if (contentDoc.exists()) {
                            const contentData = contentDoc.data();
                            contentMap[reference] = {
                                coverImg: contentData.coverImg,
                                title: contentData.title,
                                score: contentData.score,
                                status: contentData.status,
                                type: contentData.type,
                                year: contentData.year,
                                userScore: score
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





}

module.exports = require('../../bin/Singleton')(new FirebaseUsers())