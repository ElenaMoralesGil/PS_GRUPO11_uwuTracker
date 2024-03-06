const Content = require('../../schemas/Content.schema')

const { collection, doc, getDoc, getDocs, addDoc, query, where } = require('firebase/firestore/lite')

class FirebaseContent {
    #fss
    #collection
    constructor(fss) {
        this.#collection = new String("Contents")
        this.#fss = fss
    }

    get db() { return this.#fss.db }
    get coll() { return this.#collection }

    findById = async id => getDocs(query(collection(this.db, this.coll), where("id", "==", id)))
        .then(res => res.docs.length ? res.docs[0].data() : null)

    create = async content => {
        if (await this.findById(content.id)) return null
        return (await getDoc(doc(this.db, this.coll, (await addDoc(collection(this.db, this.coll), content)).id))).data()
    }
}

module.exports = require(process.cwd() + '/bin/Singleton')(new FirebaseContent(require('./firebase.service')))