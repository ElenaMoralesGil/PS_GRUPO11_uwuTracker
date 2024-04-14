const router = require('express').Router()

const Contents = require('../../models/Contents.model')
const Content = require('../../schemas/Content.schema')

router.get('/search', (req, res) => {
    Contents.find(req.query)
        .then(contents => {
            if (!contents.data.length) return res.status(404).json({ msg: 'not found' })
            res.status(201).json(contents)
        })
        .catch(err => { console.error('ERROR:' + err); res.status(500).json({ msg: err }) })
})

router.get('/:id', (req, res) => {
    Contents.findById(req.params.id)
        .then(content => {
            if (!content) return res.status(404).json({ msg: 'not found' })
            res.status(200).json(content)
        })
        .catch(err => { console.error('ERROR: ' + err); res.status(500).json({ msg: err }) })
})
router.post('/:userId/addLike/:contentId', async (req, res) => {
    const { userId, contentId } = req.params;
    try {
        const likes = await Contents.addLike(userId, contentId);
        if (likes !== undefined) {
            res.status(200).json(likes); // Return the number of likes directly
        } else {
            res.status(404).json({ msg: 'Failed to add like' });
        }
    } catch (error) {
        console.error('ERROR: ' + error);
        res.status(500).json({ msg: error });
    }
});


module.exports = router;