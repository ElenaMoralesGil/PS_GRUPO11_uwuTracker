const User = require(process.cwd() + '/schemas/User.schema.js')

const { collection, doc, getDoc, addDoc, query, where, getDocs, updateDoc } = require('firebase/firestore/lite')


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

    find = queryObj => {

        const constrains = []
        for (let [key, val] in Object.entries(queryObj))
            constrains.push(String(key), '==', val)

        return getDocs(query(collection(this.#db, this.#coll), ...constrains))
            .then(res => res.docs.length ? res.docs.map(elm => User.parse(elm.data())) : null)
    }

    create = async user => {

        if (!this.find({ username: user.username })) return null

        const userRef = await addDoc(collection(this.#db, this.#coll), user.get())
        await updateDoc(doc(this.#db, this.#coll, userRef.id), { id: userRef.id })

        return { ...user, id: userRef.id }
    }

    update = async ({ id, userProps }) => {
        if (!await this.findById(id)) return false

        await updateDoc(doc(this.#db, this.#coll, id), userProps)

        return true
    }
}

module.exports = require('../../bin/Singleton')(new FirebaseUsers())