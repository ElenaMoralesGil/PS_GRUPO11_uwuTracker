const Singleton = require("../bin/Singleton")
const ReviewServ = require('../services/Reviews.firebase')
const Review = require("../schemas/Review.schema")

class Reviews{

    #path
    constructor() {
        this.#path = process.env.REVIEWS_ROUTER_PATH
    }
    get path() { return this.#path }

    findById = id => new Review(ReviewServ.findById(id))
}
module.exports = Singleton(new Reviews())