const { collection, doc, increment,arrayUnion, getDoc, getDocs, setDoc, addDoc, updateDoc, query, where } = require('firebase/firestore/lite');
const Content = require('../../schemas/Content.schema');

class FirebaseContent {
    #fss
    #collection
    constructor(fss) {
        this.#collection = "Contents"
        this.#fss = require('./firebase.service')
    }

    get #db() { return this.#fss.db }
    get #coll() { return this.#collection }

    findById = async id => getDoc(doc(this.#db, this.#coll, String(id))).then(res => res.data()).then(data => data ? Content.parse(data) : null)

    create = async content => {
        if (await this.findById(content.id)) return null

        await setDoc(doc(this.#db, this.#coll, String(content.id)), content.get())

        return await this.findById(content.id) ? Content.parse(content) : null
    }

    addLike = async (userId, contentId) => {
        try {
            const userDocRef = doc(this.#db, "Users", userId);
            const contentDocRef = doc(this.#db, this.#coll, contentId);

            // Check if the content is already in favorites
            const userDocSnapshot = await getDoc(userDocRef);
            const contentDocSnapshot = await getDoc(contentDocRef);
            if (!userDocSnapshot.exists()) {
                console.log('User not found');
                return false;
            }

            const userData = userDocSnapshot.data();
            const contentData = contentDocSnapshot.data();
            const favorites = userData.favorites || [];
            if (favorites.includes(contentId)) {
                return contentData.likes || 0;
            }

            // Increment likes in the content document
            await updateDoc(contentDocRef, {
                likes: increment(1)
            });

            // Update favorites array in the user document
            await updateDoc(userDocRef, {
                favorites: arrayUnion(contentId)
            });

            console.log("sucess", contentData.likes);
            return contentData.likes + 1 || 0;
        } catch (error) {
            console.error("Error adding like:", error);
            return false;
        }
    }

    removeLike = async (userId, contentId) => {

    }
}

module.exports = require(process.cwd() + '/bin/Singleton')(new FirebaseContent(require('./firebase.service')));
