const router = require('express').Router()

const Comments = require('../../models/Comments.model')
const Comment = require('../../schemas/Comment.schema')



router.get('/find', (req, res) => {

    const params = {}, options = {}
    for (let [key, val] of Object.entries(req.query))
        Comments.opts.includes(key) ? options[key] = val : params[key] = val

    Comments.find(params, options).then(comments => {
        if (!comments) return res.status(404).json({ msg: 'not-found' })
        return res.status(200).json({ data: comments })
    })
        .catch(error => { console.log(error); res.status(500).json({ error, msg: 'server-error' }) })
})


router.get('/:id', (req, res) => {

    Comments.findById(req.params.id).then(comment => {
        if (!comment) return res.status(404).json({ msg: 'not-found' })
        return res.status(200).json({ data: comment })
    })
        .catch(error => { console.log('ERROR', error); res.status(500).json({ error, msg: 'server-error' }) })
})


router.post('/', (req, res) => {

    if (!req.user) return res.status(300).json({ msg: 'no-user-logged-in' })
    if (req.user.id != req.body.userId) return res.status(300).json({ msg: 'not-user-creator' })

    Comments.create(Comment.parse(req.body)).then(comment => {
        if (!comment) return res.status(300).json({ msg: 'could-not-be-created' })
        return res.status(200).json({ data: comment })
    })
        .catch(error => { console.log('ERROR', error); res.status(500).json({ error, msg: 'server-error' }) })
})


router.delete('/:id', async (req, res) => {

    if (!req.user) return res.status(300).json({ msg: 'no-user-logged-in' })

    const comment = await Comments.findById(req.params.id)
    if (!comment) return res.status(404).json({ msg: 'not-found' })
    if (comment.userId != req.user.id) return res.status(300).json({ msg: 'not-user-creator' })

    Comments.delete(req.params.id).then((success => {
        if (!success) return res.status(300).json({ msg: 'does-not-exist' })
        return res.status(200).json({ msg: 'eliminated-sucessfully' })
    }))
        .catch(error => { console.log('ERROR:', error); res.status(500).json({ error, msg: 'server-error' }) })
})


router.put('/:id', async (req, res) => {

    if (!req.user) return res.status(300).json({ msg: 'no-user-logged-in' })

    const comment = await Comments.findById(req.params.id)
    if (!comment) return res.status(404).json({ msg: 'not-found' })
    if (comment.userId != req.user.id) return res.status(300).json({ msg: 'not-user-creator' })

    Comments.update(req.params.id, req.body).then(sucess => {
        if (!sucess) return res.status(300).json({ msg: 'does-not-exits' })
        return res.status(200).json({ msg: 'updated-suscessfully' })
    })
        .catch(error => { console.log('ERROR:', error); res.status(500).json({ error, msg: 'server-error' }) })
})


module.exports = router