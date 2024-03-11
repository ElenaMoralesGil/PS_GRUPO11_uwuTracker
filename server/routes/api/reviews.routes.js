const router = require('express').Router()

const Reviews = require('../../models/Reviews.model')


router.get('/', (req, res, next) => {

    res.json({
        review: (Reviews.findById("id").name)
    })
})

module.exports = router