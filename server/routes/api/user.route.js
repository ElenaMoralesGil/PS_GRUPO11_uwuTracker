const router = require('express').Router()

const User = require('../../schemas/User.schema')
const Users = require('../../models/Users.model')

const bcrypt = require('bcrypt')
const emailReEx = /^ (([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{ 1, 3 }\.[0-9]{ 1, 3 }\.[0-9]{ 1, 3 }\.[0-9]{ 1, 3 }\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{ 2,}))$/


router.post('/signup', async (req, res) => {

    const { username, password, email } = req.body

    if (!username) return res.status(403).json({ msg: 'no-username', user: null })
    if (!password) return res.status(403).json({ msg: 'no-password', user: null })
    if (!email || emailReEx.test(email)) return res.status(403).json({ msg: 'invalid-email', user: null })
    if (await Users.find({ email })) return res.status(403).json({ msg: 'email-already-exist', user: null })

    console.log(process.env.SALT)
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(Number(process.env.SALT)))

    Users.create(User.parse({ ...req.body, password: hashedPassword })).then(user => {

        if (!user) return res.status(409).json({ msg: 'already-exists' })

        delete user.password
        res.status(201).json(user)
    })
        .catch(err => { console.error('ERROR: ' + err); res.status(500).json({ msg: err }) })
})

router.get('/search', (req, res) => {
    Users.find(req.query, 'AND').then(users => {
        if (!users.length) return res.status(404).json({ msg: 'not-found' })
        users = users.map(elm => {
            delete elm.password
            return elm
        })

        res.status(200).json(users)
    })
        .catch(err => { console.error('ERROR: ' + err); res.status(500).json({ msg: err }) })
})

router.get('/id/:id', (req, res) => {
    Users.findById(req.params.id).then(user => {
        if (!user) return res.status(404).json({ msg: 'not-found' })

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

router.get('/:userId/contents/:listField', async (req, res) => {
    const { userId, listField } = req.params;
    console.log('userId:', userId, 'listField:', listField);
    try {
        const contents = await Users.getContentsFromList(userId, listField);
        if (!contents) {
            return res.status(404).json({ msg: 'contents-not-found' });
        }
        res.status(200).json(contents);
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).json({ msg: 'internal-server-error' });
    }
});

module.exports = router