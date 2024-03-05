const Content = require('../../schemas/Content.schema')

const { collection, doc, addDoc, query, where } = require('firebase/firestore/lite')

class FirebaseContent {
    #fss
    #collection
    constructor(fss) {
        this.#collection = "Contents"
        this.#fss = fss
    }

    findById = async id => doc(this.#fss.db, this.#collection, id)

    create = async content => {
        // if (await this.findById(content.id)) return false

        //return this.#fss.db.collection(this.#collection).addDoc(content)
        return addDoc(collection(this.#fss.db, this.#collection), content)
    }
}

module.exports = new FirebaseContent(require('./firebase.service'))