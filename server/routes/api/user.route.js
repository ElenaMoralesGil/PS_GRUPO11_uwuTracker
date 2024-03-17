const router = require('express').Router()

const User = require('../../schemas/User.schema')
const Users = require('../../models/Users.model')

const bcrypt = require('bcrypt')
const SALT = 10
const emailReEx = /^ (([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{ 1, 3 }\.[0-9]{ 1, 3 }\.[0-9]{ 1, 3 }\.[0-9]{ 1, 3 }\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{ 2,}))$/


router.post('/signup', async (req, res) => {

    const { username, password, email } = req.body

    if (!username) return res.status(403).json({ msg: 'no-username', user: null })
    if (!password) return res.status(403).json({ msg: 'no-password', user: null })
    if (!email || emailReEx.test(email)) return res.status(403).json({ msg: 'invalid-email', user: null })

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT))

    Users.create(User.parse({ ...req.body, password: hashedPassword })).then(user => {

        if (!user) return res.status(409).json({ msg: 'already-exists' })

        delete user.password
        res.status(201).json(user)
    })
        .catch(err => { console.error('ERROR: ' + err); res.status(500).json({ msg: err }) })
})

router.get('/search', (req, res) => {
    Users.find(req.query, 'AND').then(users => {
        if (!user) return res.status(404).json({ msg: 'not-found' })
        users = users.map(elm => {
            delete elm.password
            return elm
        })

        delete user.password
        res.status(200).json(user)
    })
        .catch(err => { console.error('ERROR: ' + err); res.status(500).json({ msg: err }) })
})

router.get('/:username', (req, res) => {
    Users.find({ username: req.params.username }).then(user => {
        if (!user) return res.status(404).json({ msg: 'not-found' })
        user = user[0]

        delete user.password
        res.status(200).json(user)
    })
        .catch(err => { console.error('ERROR: ' + err); res.status(500).json({ msg: err }) })
})


module.exports = router