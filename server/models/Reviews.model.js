const Review = require("../schemas/Review.schema");
const FirebaseReviewService = require("../services/firebase/FirebaseReview.service");
const db = require('../services/firebase/FirebaseReview.service')
class Reviews {
    #db
    constructor() {
        this.db = db
    }

    findById = id => {
        console.log("Searching for review with ID:", id);
        return this.#db.findById(id)
            .then(reviewData => {
                if (!reviewData) {
                    console.log("Review not found.");
                    return null; // Return null if the review doesn't exist
                }
                console.log("Review data:", reviewData);
                return new Review({ id: reviewData.id, ...reviewData }); // Assuming reviewData already contains the required fields
            })
            .catch(error => {
                console.error("Error finding review:", error);
                return null; // Handle errors gracefully by returning null
            });
    };


    createReview = (userId, content, score, title, description) => {return this.db.create(userId, content, score, title, description);};

    like = (id, userId) => {
        return this.findById(id)
            .then(review => {
                if (!review) throw new Error('Review not found');

                if (review.likes.includes(userId)) throw new Error('Already liked');

                review.likes.push(userId);
                return this.#db.update(id, review.getData()); // Assuming `update` method in FirebaseReviewService
            });
    };

    dislike = (id, userId) => {
        return this.findById(id)
            .then(review => {
                if (!review) throw new Error('Review not found');

                if (review.dislikes.includes(userId)) throw new Error('Already disliked');

                review.dislikes.push(userId);
                return this.#db.update(id, review.getData()); // Assuming `update` method in FirebaseReviewService
            });
    };

    edit = (id, user, title, description, score) => {
        return this.findById(id)
            .then(review => {
                if (!review) throw new Error('Review not found');

                // Check if the current user is the owner of the review
                if (review.user !== user) throw new Error('Unauthorized to edit');

                review.title = title;
                review.description = description;
                review.score = score;
                return this.#db.update(id, review.getData());
            });
    };

    delete = id => {
        return this.findById(id)
            .then(review => {
                if (!review) throw new Error('Review not found');

                return this.#db.delete(id);
            });
    };
}

module.exports = require(process.cwd() + '/bin/Singleton')(new Reviews());
