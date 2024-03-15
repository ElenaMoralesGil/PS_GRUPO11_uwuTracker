const router = require('express').Router()

const Contents = require('../../models/Contents.model')
const Content = require('../../schemas/Content.schema')

router.get('/search', (req, res) => {
    Contents.findByName(req.query.name)
        .then(contents => {
            if (!contents.length) return res.status(404).json({ msg: 'not found' })
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


// router.post('/', (req, res) => {
//     Contents.create(Content.parse(req.body))
//         .then(content => {
//             if (!content) return res.status(409).json({ msg: 'already exists' })
//             res.status(200).json(content)
//         })
//         .catch(err => { console.log(err); res.status(500).json({ msg: err }) })
// })


module.exports = router
