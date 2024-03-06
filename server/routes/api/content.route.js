const router = require('express').Router()

const Contents = require('../../models/Contents.model')


router.get('/:id', (req, res) => {
    Contents.findById(req.params.id)
        .then(content => {
            if (!content) return res.status(404).json({ msg: 'not found' })
            res.status(200).json(content.stringify())
        })
        .catch(err => { console.log(err); res.status(500).json({ msg: err }) })
})

router.post('/', (req, res) => {
    Contents.create(req.body)
        .then(content => {
            if (!content) return res.status(409).json({ msg: 'already exists' })
            res.status(200).json(content.stringify())
        })
        .catch(err => { console.log(err); res.status(500).json({ msg: err }) })
})


module.exports = router
