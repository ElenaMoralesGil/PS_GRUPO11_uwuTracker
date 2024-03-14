const router = require('express').Router()

const Users = require('../../models/Users.model')



router.get(':id', (req, res) => {
    Users.findById(req.params.id).then(user => res.json(user))
})

router.post('/create', (req, res) => {
    Users.create(req.body).then(user => res.json(user))
})

module.exports = router