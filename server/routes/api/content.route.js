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

router.get('/persistent-search', (req, res) => {

    const params = {}, options = {}
    for (let [key, value] of Object.entries(req.query)) Contents.opts.includes(key) ? options[key] = value : params[key] = value


    Contents.persistenceFind(params, options).then(contents => {

        if (!contents) return res.status(404).json({ msg: 'not-found' })

        return res.status(200).json(contents)
    })
        .catch(err => { console.log(err); res.status(500).json({ msg: err }) })
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


module.exports = router;