const Review = require('../schemas/Review.schema')
const db = require('../services/firebase/FirebaseReview.service')
const api = require('../services/jikan/JikanContent.service')


class Reviews {
    #api
    #db
    constructor() {
        this.#api = api
        this.#db = db
    }


    findById = id => this.#db.findById(id).then(review => {

        if (review) return review

    }).then(review => review ? Review.parse(review) : null)

    createReview = (userId, content, score, title, description) => {return this.#db.create(userId, content, score, title, description);};

    edit = (id, title, description, score) => {
        return this.findById(id)
            .then(review => {
                console.log('review', review);
                if (!review) throw new Error('Review not found');
                review.title = title;
                review.description = description;
                review.score = score;
                console.log( "data", review.getData());
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
    likeReview = (userId, reviewId) =>
        this.#db.like(userId, reviewId).then(([likes, dislikes]) => [likes, dislikes]);

    dislikeReview = (userId, reviewId) =>
        this.#db.dislike(userId, reviewId).then(([likes, dislikes]) => [likes, dislikes]);
}

module.exports = require(process.cwd() + '/bin/Singleton')(new Reviews());
