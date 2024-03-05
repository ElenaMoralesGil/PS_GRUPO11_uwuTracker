const router = require('express').Router()

const Users = require('../../models/Users.model')


router.get('/', (req, res, next) => {

    res.json({
        user: (Users.findById("algo").name)
    })
})

module.exports = router