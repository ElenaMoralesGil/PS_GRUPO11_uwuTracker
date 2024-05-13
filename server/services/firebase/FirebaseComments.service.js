const { collection, doc, getDoc, getDocs, addDoc, updateDoc, query, where, deleteDoc } = require('firebase/firestore/lite')
const Comment = require('../../schemas/Comment.schema')


class FirebaseComments {
    #fss
    #coll
    constructor() {
        this.#coll = 'Comments'
        this.#fss = require('./firebase.service')
    }

    get #db() { return this.#fss.db }
    get #opts() { return this.#fss.optParser }

    findById = async id => getDoc(doc(this.#db, this.#coll, `${id}`)).then(res => res.data()).then(data => data ? Comment.parse(data) : null)

    find = (props, opts) => {

        // constrains
        const constrains = []
        for (let [key, val] of Object.entries(props))
            constrains.push(where(`${key}`, '==', val))

        // options
        const options = []

        opts.orderByDir = opts.orderByDir || 'asc'
        opts.orderBy && options.push(this.#opts.orderBy(opts.orderBy, opts.orderByDir))
        delete opts.orderBy
        delete opts.orderByDir

        const join = opts?.join || 'or'
        delete opts.join

        for (let [key, val] of Object.entries(opts))
            options.push(this.#opts[key](val))

        // request
        return getDocs(query(collection(this.#db, this.#coll), this.#opts.join[join](...constrains), ...options))
            .then(data => data.docs ? data.docs.map(comment => Comment.parse(comment.data())) : null)
    }

    create = async comment => {
        try {
            const ref = await addDoc(collection(this.#db, this.#coll), comment.get())
            await updateDoc(doc(this.#db, this.#coll, ref.id), { id: ref.id })
            return Comment.parse({ ...comment, id: ref.id })
        } catch (error) {
            return null
        }
    }

    update = async (id, props) => {
        try {
            await updateDoc(doc(this.#db, this.#coll, id), props)
            return true
        } catch (err) {
            return false
        }
    }

    delete = async id => {
        try {
            await deleteDoc(doc(this.#db, this.#coll, id))
            return true
        } catch (err) {
            return false
        }
    }

}


module.exports = require('../../bin/Singleton')(new FirebaseComments())