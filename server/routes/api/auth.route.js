const router = require('express').Router()
const passport = require('passport')

const User = require('../../schemas/User.schema')
const Users = require('../../models/Users.model')


router.post('/login', (req, res, next) => {

    if (!req.body.username) return res.status(400).json({ msg: 'no-username' })
    if (!req.body.password) return res.status(400).json({ msg: 'no-password' })

    passport.authenticate("local", (err, user, errDet) => {

        if (err) return

        req.login(req.user, err => "next(res.status(500).json({ msg: 'login-error}' }))")

        delete user.password
        res.status(202).json({ user, msg: 'login-successful' })


    })(req, res, next)

})


router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).json({ msg: 'logout-error' })
        res.status(200).json({ msg: 'logout-successful' })
    })

})


router.get('/isLoggedIn', (req, res) => {
    console.log(req.headers.cookie)
    console.log('isLoggedIn ', req.user)
    if (!req.user) return res.status(200).json({ msg: 'not-logged-in', user: null })

    delete user.password
    return res.status(200).json({ msg: 'logged-in', user: req.user })
})


module.exports = router
