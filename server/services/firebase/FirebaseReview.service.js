const Review = require('../../schemas/Review.schema')

const { collection, doc, getDoc, deleteDoc, arrayUnion, addDoc, getDocs, updateDoc, query, where } = require('firebase/firestore/lite')

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

    findById = async id => {
        try {
            const review = (await getDoc(doc(this.db, this.coll, String(id))));
            if (!review.exists()) {
                console.error('review not found for ID:', id);
                return null;
            }

            const reviewData = review.data();

            // Log reviewData to inspect reviews field
            //console.log('review Data:', reviewData);


            return Review.parse({ ...reviewData, id: review.id });
        } catch (error) {
            console.error('Error fetching content by ID:', error);
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
            const contentQuerySnapshot = await getDocs(query(collection(this.db, 'Contents'), where('id', '==', content))); // Buscar el contenido por su ID personalizado
            if (!contentQuerySnapshot.empty) {
                const contentDocRef = contentQuerySnapshot.docs[0].ref;
                await updateDoc(contentDocRef, {
                    reviews: arrayUnion(docRef.id) // Agregar el ID de la revisión a la lista de revisiones del contenido
                });
            } else {
                console.error("Content not found with ID:", content);
            }

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