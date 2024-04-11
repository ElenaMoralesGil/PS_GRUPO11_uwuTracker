const { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, query, where } = require('firebase/firestore/lite');
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
    get #opts() { return this.#fss.optParser }

    findById = async id => getDoc(doc(this.#db, this.#coll, String(id))).then(res => res.data()).then(data => data ? Content.parse(data) : null)

    find = (props, opts) => {
        const constrains = []
        for (let [key, val] of Object.entries(props))
            constrains.push(where(`${key}`, '==', val))

        const options = []

        opts.orderByDir = opts.orderByDir || 'asc'
        opts.orderBy && options.push(this.#opts.orderBy(opts.orderBy, opts.orderByDir))
        delete opts.orderBy
        delete opts.orderByDir

        opts.join = opts?.join || 'or'
        for (let [key, val] of Object.entries(props))
            options.push(this.#opts[key](val))

        return getDocs(query(collection(this.#db, this.#coll), this.#opts.join[opts.join](...constrains), ...options))
            .then(data => data.docs ? data.docs.map(content => Content.parse(content)) : null)
    }

    create = async content => {
        if (await this.findById(content.id)) return null

        await setDoc(doc(this.#db, this.#coll, String(content.id)), content.get())

        return await this.findById(content.id) ? Content.parse(content) : null
    }
}

module.exports = require(process.cwd() + '/bin/Singleton')(new FirebaseContent(require('./firebase.service')));
