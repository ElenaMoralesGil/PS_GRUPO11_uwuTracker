const Review = require('../schemas/Review.schema')
const db = require('../services/firebase/FirebaseReview.service')


class Contents {
    #db
    constructor() {
        this.#db = db
    }

    findById = id => this.#db.findById(id).then(review => {

        if (review) return review

    }).then(review => review ? Review.parse(review) : null)

    findByName = name => this.#db.findByName(name).then(reviews => reviews.length ? reviews.map(elm => Review.parse(elm)) : null)

    create = async review => this.#db.create(review).then(review => review ? Review.parse(review) : null)
}

module.exports = require(process.cwd() + '/bin/Singleton')(new Reviews())