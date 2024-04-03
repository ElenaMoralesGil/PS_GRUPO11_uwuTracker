const User = require(process.cwd() + '/schemas/User.schema.js')

const { collection, doc, getDoc, addDoc, query, where, getDocs, updateDoc, and, or } = require('firebase/firestore/lite')


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

    getContentsFromList = async (userId, listField) => {
        try {
            const userDoc = await getDoc(doc(this.#db, this.#coll, userId));
            if (!userDoc.exists()) {
                console.log('User not found');
                return null;
            }

            const userData = userDoc.data();
            const references = userData[listField];

            if (!Array.isArray(references)) {
                console.log('Invalid list field or it does not contain an array');
                return null;
            }

            const contentPromises = references.map(async reference => {
                try {
                    const contentDoc = await getDoc(doc(this.#db, 'Contents', reference.id));
                    if (contentDoc.exists()) {
                        return contentDoc.data();
                    } else {
                        console.log(`Content with reference ${reference.id} not found`);
                        return null;
                    }
                } catch (error) {
                    console.error(`Error processing reference ${reference.id}:`, error);
                    return null;
                }
            });

            const contents = await Promise.all(contentPromises);
            return contents.filter(content => content !== null);
        } catch (error) {
            console.error('Error getting contents from list:', error);
            return null;
        }
    }

}

module.exports = require('../../bin/Singleton')(new FirebaseUsers())