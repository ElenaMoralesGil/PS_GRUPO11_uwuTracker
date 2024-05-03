const router = require('express').Router()

const User = require('../../schemas/User.schema')
const Users = require('../../models/Users.model')


router.post('/login', async (req, res, next) => {

    const { username, password } = req.body

    if (!username) return res.status(400).json({ msg: 'no-username' })
    if (!password) return res.status(400).json({ msg: 'no-password' })

    const user = await req.login(username, password)
    if (!user) return res.status(402).json({ msg: 'login-unsuccessful' })

    delete user.password
    res.status(202).json({ user, msg: 'login-successful' })
})


router.get('/logout', (req, res, next) => {
    req.logout()
    res.status(200).json({ msg: 'logout-successful' })
})


router.get('/isLoggedIn', (req, res) => {
    if (!req.user) return res.status(200).json({ msg: 'not-logged-in', user: null })

    const user = req.user
    delete user.password
    return res.status(200).json({ msg: 'logged-in', user })
})


module.exports = router
