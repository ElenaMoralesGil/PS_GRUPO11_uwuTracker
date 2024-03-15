const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const Users = require('../models/Users.model')


passport.serializeUser((loggedUser, cb) => { cb(null, loggedUser._id) })

passport.deserializeUser((userIdFromSession, cb) => {
    Users.findById(userIdFromSession)
        .then(user => cb(null, user))
        .catch(err => console.error('ERROR: Passport deserializer'))
})

passport.use(new LocalStrategy((username, password, done) => {
    Users.findOne({ username })
        .then(user => {

            if (!user) return done(null, false, { msg: 'user-not-found' })
            if (!bcrypt.compareSync(password, user.password)) done(null, false, { msg: 'incorrect-password' })

            done(null, user)
        })
        .catch(err => done(err))
}))

module.exports = app => {
    app.use(passport.initialize())
    app.use(passport.session())
}