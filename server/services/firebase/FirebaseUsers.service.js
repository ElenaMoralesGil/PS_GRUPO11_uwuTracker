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
            let references;
            let userScores;
            if (listField) {
                references = userData[listField];
                if (!Array.isArray(references)) {
                    console.log('Invalid list field or it does not contain an array');
                    return null;
                }
                userScores = userData["userScores"]
                const contentsRef = collection(this.#db, 'Contents');
                const contentsQuery = query(contentsRef, where('id', 'in', Object.keys(userScores)));
                const contentsSnapshot = await getDocs(contentsQuery);

                if (contentsSnapshot.empty) {
                    console.log('No contents found for the provided user scores');
                }

                const contentsData = contentsSnapshot.docs.map(doc => doc.data());
                if (contentsData.some(content => !content.year)) {
                    console.log('Year not found for some contents');
                }
            }

            const contentMap = {};

            if (references) {
                for (const reference of references) {
                    try {
                        const contentDoc = await getDoc(doc(this.#db, 'Contents', reference));
                        const score = userScores[reference]  || '-';
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
        } catch (error) {
            console.error('Error getting contents from list:', error);
            return null;
        }
    }





}

module.exports = require('../../bin/Singleton')(new FirebaseUsers())