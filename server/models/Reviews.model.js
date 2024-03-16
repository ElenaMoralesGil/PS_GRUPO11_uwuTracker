const Review = require("../schemas/Review.schema");
const db = require('../services/firebase/FirebaseReview.service')
const Content = require("../schemas/Content.schema");
class Reviews {
    #db
    constructor() {
        this.db = db
    }

    findById = id => this.#db.findById(id).then(review => {

        if (review) return review

    }).then(review => review ? Review.parse(review) : null)

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
