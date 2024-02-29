const router = require('express').Router()

const users1 = require('../models/Users.model')
const Users = require('../models/Users.model')
const users2 = require('../models/Users.model')


router.get('/', (req, res, next) => {
    res.json({
        algo: (Users.findById("algo").name)
    })
})


module.exports = router