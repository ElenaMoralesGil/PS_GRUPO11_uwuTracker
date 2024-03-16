// content.route.js
const router = require('express').Router();
const Contents = require('../../models/Contents.model');

router.get('/:id', (req, res) => {
    Contents.findById(req.params.id)
        .then(content => {
            if (!content) return res.status(404).json({ msg: 'Content not found' });
            res.status(200).json(content);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ msg: 'Internal Server Error' });
        });
});

module.exports = router;