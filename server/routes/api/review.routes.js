const router = require('express').Router()

const Reviews = require('../../models/Reviews.model')



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

router.put('/:id', async (req, res) => {
    const { title, description, score } = req.body;
    const reviewId = req.params.id;

    try {
        const updatedReview = await Reviews.edit(reviewId, title, description, score);
        if (!updatedReview) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json(updatedReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', (req, res) => {
    Reviews.delete(req.params.id)
        .then(() => res.status(200).json({ msg: 'Review deleted' }))
        .catch(err => res.status(500).json({ msg: err }));
});
router.post('/:id/like', async (req, res) => {
    const { userId } = req.body;
    const reviewId = req.params.id;

    Reviews.likeReview(userId, reviewId)
        .then(([likes, dislikes]) => {
            res.status(200).json({ likes, dislikes });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

router.post('/:id/dislike', async (req, res) => {
    const { userId } = req.body;
    const reviewId = req.params.id;

    Reviews.dislikeReview(userId, reviewId)
        .then(([likes, dislikes]) => {
            res.status(200).json({ likes, dislikes });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});
router.get('/:reviewId/check-like/:userId', async (req, res) => {
    const { userId, reviewId } = req.params;
    try {
        const isLiked = await Reviews.checkIfLiked(userId, reviewId);
        res.status(200).json({ isLiked });
    } catch (error) {
        console.error('Error checking like:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.get('/:reviewId/check-dislike/:userId', async (req, res) => {
    const { userId, reviewId } = req.params;
    try {
        const isDisliked = await Reviews.checkIfDisliked(userId, reviewId);
        res.status(200).json({ isDisliked });
    } catch (error) {
        console.error('Error checking dislike:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});



module.exports = router