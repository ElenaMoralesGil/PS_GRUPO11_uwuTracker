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
