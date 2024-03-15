const Content = require('../../schemas/Review.schema')

const { collection, doc, getDoc, deleteDoc,arrayUnion,  addDoc, updateDoc, query, where } = require('firebase/firestore/lite')

class FirebaseReview {
    #fss
    #collection
    #firestore
    constructor(fss) {
        this.#collection = new String("Reviews")
        this.#fss = fss
    }

    get db() { return this.#fss.db }
    get coll() { return this.#collection }

    async findById(id) {
        const docRef = doc(this.db, this.coll, id);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
            return { id: docSnapshot.id, ...docSnapshot.data() };
        } else {
            return null;
        }
    }

    async update(id, data) {
        const docRef = doc(this.db, this.coll, id);
        await updateDoc(docRef, data);
        return true;
    }


    async delete(id) {
        const reviewRef = doc(this.db, this.coll, id);
        await deleteDoc(reviewRef);
    }

    async create(userId, content, score, title, description) {
        console.log("Creating review...");
        const review = {
            userId,
            content,
            score,
            title,
            description,
            likes: 0,
            dislikes: 0
        };

        try {
            const docRef = await addDoc(collection(this.db, this.coll), review);
            console.log("Review created successfully with ID:", docRef.id);

            // Update content's reviews list
            const contentRef = doc(this.db, 'Contents', content);
            await updateDoc(contentRef, {
                reviews: arrayUnion(docRef.id) // Add the review ID to the content's reviews list
            });

            // Update user's reviews list
            const userRef = doc(this.db, 'Users', userId);
            await updateDoc(userRef, {
                reviews: arrayUnion(docRef.id) // Add the review ID to the user's reviews list
            });

            return docRef.id; // Optionally return the ID of the created review
        } catch (error) {
            console.error("Error creating review:", error);
            return null;
        }
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