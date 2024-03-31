const Review = require('../../schemas/Review.schema')
const { collection, doc, arrayRemove, getDoc, deleteDoc, arrayUnion, addDoc, getDocs, query, where } = require('firebase/firestore/lite')
const { updateDoc } = require('firebase/firestore/lite');

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


            //console.log('review Data:', reviewData);


            return Review.parse({ ...reviewData, id: review.id });
        } catch (error) {
            console.error('Error fetching content by ID:', error);
            return null;
        }
    }

    async update(id, data) {
        try {
            const docRef = doc(this.db, this.coll, id);
            const reviewSnapshot = await getDoc(docRef);
            if (!reviewSnapshot.exists()) {
                console.error('Review not found for ID:', id);
                return false;
            }

            await updateDoc(docRef, data);
            console.log("Review updated successfully with ID:", id);
            return true;
        } catch (error) {
            console.log("Error updating review:", error);
            console.error("Error updating review:", error);
            return false;
        }
    }




    async delete(id) {
        try {
            const reviewRef = doc(this.db, this.coll, id);

            const reviewSnapshot = await getDoc(reviewRef);
            if (!reviewSnapshot.exists()) {
                console.error('Review not found for ID:', id);
                return false;
            }

            const reviewData = reviewSnapshot.data();

            await deleteDoc(reviewRef);

            // Update content's reviews list
            const contentId = reviewData.content;
            const contentQuerySnapshot = await getDocs(query(collection(this.db, 'Contents'), where('id', '==', contentId)));
            if (!contentQuerySnapshot.empty) {
                const contentDocRef = contentQuerySnapshot.docs[0].ref;
                await updateDoc(contentDocRef, {
                    reviews: arrayRemove(id)
                });
            } else {
                console.error("Content not found with ID:", contentId);
            }

            // Update user's reviews list
            const userId = reviewData.userId;
            const userRef = doc(this.db, 'Users', userId);
            await updateDoc(userRef, {
                reviews: arrayRemove(id)
            });

            return true;
        } catch (error) {
            console.error("Error deleting review:", error);
            return false;
        }
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

