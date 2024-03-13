const Singleton = require("../bin/Singleton")
const ReviewServ = require('../services/Reviews.firebase')
const Review = require("../schemas/Review.schema")

class Reviews{

    #path


    constructor() {
        this.#path = process.env.REVIEWS_ROUTER_PATH
        this.score =0

    }
    get path() { return this.#path }

    findById = id => new Review(ReviewServ.findById(id))
    async like(id, userId) {
        const review = await this.findById(id);
        if (!review) throw 'Review not found';

        if (review.likes.includes(userId)) throw 'Already liked';

        review.likes.push(userId);
        await review.save();
    }

    async dislike(id, userId) {
        const review = await this.findById(id);
        if (!review) throw 'Review not found';

        if (review.dislikes.includes(userId)) throw 'Already disliked';

        review.dislikes.push(userId);
        await review.save();
    }

    async edit(id, updatedReview) {
        const review = await this.findById(id);
        if (!review) throw 'Review not found';

        // Check if the current user is the owner of the review
        if (review.user !== updatedReview.user) throw 'Unauthorized to edit';

        Object.assign(review, updatedReview);
        await review.save();
        return review;
    }

    async delete(id) {
        const review = await this.findById(id);
        if (!review) throw 'Review not found';

        await review.delete();
    }

}
module.exports = Singleton(new Reviews())