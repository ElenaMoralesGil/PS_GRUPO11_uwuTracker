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
    const reviewId = req.params.id;
    Reviews.findById(reviewId)
        .then(review => {
            if (!review) {
                return res.status(404).json({ error: 'Review not found' });
            }
            res.status(200).json(review);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});


router.post('/', (req, res) => {
    const { userId, content, score, title, description } = req.body;
    Reviews.createReview(userId, content, score, title, description)
        .then(createdReview => {
            if (!createdReview) return res.status(409).json({ msg: 'already exists' })
            res.status(201).json(createdReview);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

router.post('/:id/like', (req, res) => {
    Reviews.like(req.params.id, req.body.userId)
        .then(() => res.status(200).json({ msg: 'Liked' }))
        .catch(err => res.status(500).json({ msg: err }));
});

router.post('/:id/dislike', (req, res) => {
    Reviews.dislike(req.params.id, req.body.userId)
        .then(() => res.status(200).json({ msg: 'Disliked' }))
        .catch(err => res.status(500).json({ msg: err }));
});
router.put('/:id', (req, res) => {
    Reviews.edit(req.params.id, req.body)
        .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json({ msg: err }));
});

router.delete('/:id', (req, res) => {
    Reviews.delete(req.params.id)
        .then(() => res.status(200).json({ msg: 'Review deleted' }))
        .catch(err => res.status(500).json({ msg: err }));
});


module.exports = router
