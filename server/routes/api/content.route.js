const router = require('express').Router()

const Contents = require('../../models/Contents.model')


router.get('/:id', (req, res) => {
    Contents.findById(req.params.id)
        .then(content => res.status(200).json(content))
        .catch(err => res.status(500).json({ msg: err }))
})

router.post('/', (req, res) => {
    Contents.create(req.body)
        .then(content => res.status(200).json(content))
        .catch(err => console.log(err))//res.status(500).json({ msg: err }))
})


module.exports = router
