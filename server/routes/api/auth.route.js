const router = require('express').Router()
const passport = require('passport')

const User = require('../../schemas/User.schema')
const Users = require('../../models/Users.model')

const bcrypt = require('bcrypt')
const SALT = 10


// *=> AUTH

router.post('/login', (req, res) => {
    if (!req.body.username) return res.status(400).json({ msg: 'no-username' })
    if (!req.body.password) return res.status(400).json({ msg: 'no-password' })

    passport.authenticate("local", (err, user, errDet) => {
        if (err) return res.status(401).json({ msg: 'authorization-error' })
        if (!user) return res.status(500).json({ msg: errDet.message })

        req.login(user, err => err && res.status(500).json({ msg: 'login-error' }))

        res.status(202).json({ user, msg: 'login-successful' })
    })(req, res, next)
})


router.get('/logout', (req, res) => {
    req.logout()
    res.status(200).json({ msg: 'logout-successful' })
})


router.get('/isLoggedIn', (req, res) => {
    if (!req.user) return res.status(200).json({ msg: 'not-logged-in', user: null })

    return res.status(200).json({ msg: 'logged-in', user: req.user })
})


// *=> CRUD

router.post('/signup', async (req, res) => {

    const { username, password } = req.body

    if (!username) return res.status(403).json({ msg: 'no-username', user: null })
    if (!password) return res.status(403).json({ msg: 'no-password', user: null })

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT))

    Users.create(User.parse({ ...req.body, password: hashedPassword })).then(user => {

        if (!user) return res.status(409).json({ msg: 'already-exists' })

        req.login(user, err => err && res.status(500).json({ msg: 'creation-error ' + err }))

        res.status(201).json(user)
    })
        .catch(err => { console.error('ERROR: ' + err); res.status(500).json({ msg: err }) })
})

router.get(':id', (req, res) => {
    Users.findById(req.params.id).then(user => {
        if (!user) return res.status(404).json({ msg: 'not-found' })
        res.status(200).json(user)
    })
        .catch(err => { console.error('ERROR: ' + err); res.status(500).json({ msg: err }) })
})




module.exports = router