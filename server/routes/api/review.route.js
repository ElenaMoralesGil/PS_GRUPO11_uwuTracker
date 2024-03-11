const router = require('express').Router()

const Reviews = require('../../models/Reviews.model')

router.get('/search', (req, res) => {
    Reviews.findByName(req.query.name)
        .then(reviews => {
            if (!reviews.length) return res.status(404).json({ msg: 'not found' })
            res.status(200).json(reviews)
        })
        .catch(err => { console.log(err); res.status(500).json({ msg: err }) })
})

router.get('/:id', (req, res) => {
    Reviews.findById(req.params.id)
        .then(review => {
            if (!review) return res.status(404).json({ msg: 'not found' })
            res.status(200).json(review)
        })
        .catch(err => { console.log(err); res.status(500).json({ msg: err }) })
})


router.post('/', (req, res) => {
        Reviews.create(req.body)
        .then(review => {
            if (!review) return res.status(409).json({ msg: 'already exists' })
            res.status(200).json(review)
        })
        .catch(err => { console.log(err); res.status(500).json({ msg: err }) })
})


module.exports = router
