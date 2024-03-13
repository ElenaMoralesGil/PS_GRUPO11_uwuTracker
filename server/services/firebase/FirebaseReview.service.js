const Content = require('../../schemas/Review.schema')

const { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, query, where } = require('firebase/firestore/lite')

class FirebaseContent {
    #fss
    #collection
    constructor(fss) {
        this.#collection = new String("Reviews")
        this.#fss = fss
    }

    get db() { return this.#fss.db }
    get coll() { return this.#collection }

    findById = async id => getDoc(doc(this.db, this.coll, String(id))).then(res => res.data())


    async edit(id, updatedReview) {
        const reviewRef = doc(this.db, this.coll, id);
        await updateDoc(reviewRef, updatedReview);
    }

    async delete(id) {
        const reviewRef = doc(this.db, this.coll, id);
        await deleteDoc(reviewRef);
    }

    async create(review) {
        const reviewRef = await addDoc(collection(this.db, this.coll), review);
        return { ...review, id: reviewRef.id };
    }

}

module.exports = require(process.cwd() + '/bin/Singleton')(new FirebaseReview(require('./firebase.service')))


// *=> concento de auto-actualizacion añadiendo la id

// const content = await addDoc(collection(this.db, this.coll), content)
// await updateDoc(doc(this.db, this.coll, content.id), { id: content.id })


// console.log({ ...content.data(), id: content.id })

// return { ...content.data(), id: content.id }

// *=>  version antigua

// return (await getDoc(doc(this.db, this.coll, (await addDoc(collection(this.db, this.coll), content)).id))).data()


// *=> Busqueda mediante querys

// getDocs(query(collection(this.db, this.coll), where("id", "==", id)))
//         .then(res => res.docs.length ? res.docs[0].data() : null)