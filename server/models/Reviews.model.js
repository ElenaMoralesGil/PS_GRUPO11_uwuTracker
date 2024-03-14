const Review = require("../schemas/Review.schema");
const FirebaseReviewService = require("../services/firebase/FirebaseReview.service");

class Reviews {
    constructor() {
        this.db = new FirebaseReviewService();
    }

    findById = id => {
        return this.db.findById(id)
            .then(reviewData => {
                if (!reviewData.exists) return null;
                return new Review({ id: reviewData.id, ...reviewData.data() });
            });
    };

    createReview = (userId, content, score, title, description) => {
        const review = new Review({ userId, content, score, title, description });
        return Promise.resolve(review); // No need for asynchronous operation here
    };

    like = (id, userId) => {
        return this.findById(id)
            .then(review => {
                if (!review) throw new Error('Review not found');

                if (review.likes.includes(userId)) throw new Error('Already liked');

                review.likes.push(userId);
                return this.db.update(id, review.getData()); // Assuming `update` method in FirebaseReviewService
            });
    };

    dislike = (id, userId) => {
        return this.findById(id)
            .then(review => {
                if (!review) throw new Error('Review not found');

                if (review.dislikes.includes(userId)) throw new Error('Already disliked');

                review.dislikes.push(userId);
                return this.db.update(id, review.getData()); // Assuming `update` method in FirebaseReviewService
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
                return this.db.update(id, review.getData());
            });
    };

    delete = id => {
        return this.findById(id)
            .then(review => {
                if (!review) throw new Error('Review not found');

                return this.db.delete(id);
            });
    };
}

module.exports = require(process.cwd() + '/bin/Singleton')(new Reviews());
