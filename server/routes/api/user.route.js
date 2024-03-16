const router = require('express').Router()

const User = require('../../schemas/User.schema')
const Users = require('../../models/Users.model')



router.post('/signup', async (req, res) => {

    const { username, password, email } = req.body

    if (!username) return res.status(403).json({ msg: 'no-username', user: null })
    if (!password) return res.status(403).json({ msg: 'no-password', user: null })
    if (!email) return res.status(403).json({ msg: 'no-email', user: null })

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