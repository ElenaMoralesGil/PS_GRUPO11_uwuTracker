const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const bcrypt = require('bcrypt')

const Users = require('../models/Users.model')


passport.serializeUser((loggedUser, cb) => { cb(null, loggedUser.id) })

passport.deserializeUser((userIdFromSession, cb) => {

    console.log('deserializing user: ', userIdFromSession)

    Users.findById(userIdFromSession)
        .then(user => cb(null, user))
        .catch(err => console.error('ERROR: Passport deserializer'))
})

passport.use(new LocalStrategy((username, password, done) => {

    Users.find({ username })
        .then(users => {
            if (!users.length) return done(null, null, { msg: 'user-not-found' })
            const user = users[0]
            if (!bcrypt.compareSync(password, user.password)) done(null, null, { msg: 'incorrect-password' })

            done(null, user)
        })
        .catch(err => done(err))
}))


module.exports = app => {
    app.use(passport.initialize())
    app.use(passport.session())
}