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

    async like(userId, reviewId) {
        try {
            const userRef = doc(this.db, 'Users', userId);
            const userSnapshot = await getDoc(userRef);
            if (!userSnapshot.exists()) {
                console.error('User not found for ID:', userId);
                return [0, 0];
            }

            const userData = userSnapshot.data();
            const contentIds = userData.likedReviews || [];
            const dislikedReviews = userData.dislikedReviews || [];

            const reviewRef = doc(this.db, this.coll, reviewId);
            const reviewSnapshot = await getDoc(reviewRef);
            if (!reviewSnapshot.exists()) {
                console.error('Review not found for ID:', reviewId);
                return [0, 0];
            }

            const reviewData = reviewSnapshot.data();
            let deleteddislike=false;
            if (contentIds.includes(reviewId)) {
                await updateDoc(userRef, {
                    likedReviews: arrayRemove(reviewId)
                });

                await updateDoc(reviewRef, {
                    likes: reviewData.likes - 1
                });
                return [reviewData.likes - 1, reviewData.dislikes];
            } else {
                if (dislikedReviews.includes(reviewId)) {
                    await updateDoc(userRef, {
                        dislikedReviews: arrayRemove(reviewId)
                    });

                    await updateDoc(reviewRef, {
                        dislikes: reviewData.dislikes - 1
                    });
                    deleteddislike = true;
                }
                await updateDoc(userRef, {
                    likedReviews: arrayUnion(reviewId)
                });

                await updateDoc(reviewRef, {
                    likes: reviewData.likes + 1
                });
                if (deleteddislike) {
                    return [reviewData.likes +1, reviewData.dislikes -1];
                } else {
                    return [reviewData.likes +1, reviewData.dislikes];
                }
            }
        } catch (error) {
            console.error("Error liking review:", error);
            return [0, 0];
        }
    }

    async dislike(userId, reviewId) {
        try {
            const userRef = doc(this.db, 'Users', userId);
            const userSnapshot = await getDoc(userRef);
            if (!userSnapshot.exists()) {
                console.error('User not found for ID:', userId);
                return [0, 0];
            }

            const userData = userSnapshot.data();
            const contentIds = userData.dislikedReviews || [];
            const likedReviews = userData.likedReviews || [];

            const reviewRef = doc(this.db, this.coll, reviewId);
            const reviewSnapshot = await getDoc(reviewRef);
            if (!reviewSnapshot.exists()) {
                console.error('Review not found for ID:', reviewId);
                return [0, 0];
            }

            const reviewData = reviewSnapshot.data();
            let deletedliked =false;
            if (contentIds.includes(reviewId)) {
                await updateDoc(userRef, {
                    dislikedReviews: arrayRemove(reviewId)
                });

                await updateDoc(reviewRef, {
                    dislikes: reviewData.dislikes - 1
                });
                return [reviewData.likes, reviewData.dislikes - 1];
            } else {
                if (likedReviews.includes(reviewId)) {
                    await updateDoc(userRef, {
                        likedReviews: arrayRemove(reviewId)
                    });

                    await updateDoc(reviewRef, {
                        likes: reviewData.likes - 1
                    });
                    deletedliked =true;
                }
                await updateDoc(userRef, {
                    dislikedReviews: arrayUnion(reviewId)
                });

                await updateDoc(reviewRef, {
                    dislikes: reviewData.dislikes + 1
                });
                if (deletedliked) {
                    return [reviewData.likes -1, reviewData.dislikes + 1];
                } else{
                    return [reviewData.likes, reviewData.dislikes + 1];
                }
            }
        } catch (error) {
            console.error("Error disliking review:", error);
            return [0, 0];
        }
    }

    async checkIfLiked(userId, reviewId) {
        try {
            const userRef = doc(this.db, 'Users', userId);
            const userSnapshot = await getDoc(userRef);
            if (!userSnapshot.exists()) {
                console.error('User not found for ID:', userId);
                return false;
            }

            const userData = userSnapshot.data();
            const likedReviews = userData.likedReviews || [];

            return likedReviews.includes(reviewId);
        } catch (error) {
            console.error('Error checking if review is liked:', error);
            return false;
        }
    }

    async checkIfDisliked(userId, reviewId) {
        try {
            const userRef = doc(this.db, 'Users', userId);
            const userSnapshot = await getDoc(userRef);
            if (!userSnapshot.exists()) {
                console.error('User not found for ID:', userId);
                return false;
            }

            const userData = userSnapshot.data();
            const dislikedReviews = userData.dislikedReviews || [];

            return dislikedReviews.includes(reviewId);
        } catch (error) {
            console.error('Error checking if review is disliked:', error);
            return false;
        }
    }

}

module.exports = require(process.cwd() + '/bin/Singleton')(new FirebaseReview(require('./firebase.service')))

