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
router.post('/:userId/addLike/:contentId', (req, res) => {
    const { userId, contentId } = req.params;
    Contents.addLike(userId, contentId)
        .then(success => {
            if (success) {
                res.status(200).json({ msg: 'Like added successfully' });
            } else {
                res.status(404).json({ msg: 'Failed to add like' });
            }
        })
        .catch(err => {
            console.error('ERROR: ' + err);
            res.status(500).json({ msg: err });
        });
});


module.exports = router;