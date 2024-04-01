const bcrypt = require('bcrypt')
const Users = require('../models/Users.model')


const serializer = (user, cb) => { cb(user.id, null) }

const deserializer = (userIdfromSession, cb) => {
    Users.findById(userIdfromSession)
        .then(user => cb(user, null))
        .catch(err => cb(null, err))
}

module.exports = app => {
    app.use((req, res, next) => {
        req.logout = err => { req.session.destroy(); console.log('mi logout') }
        req.login = (username, password, done) => {
            console.log('mi login')
            Users.find({ username })
                .then(users => {
                    if (!users.length) return done(null, { msg: 'user-not-found' })
                    const user = users[0]
                    if (!bcrypt.compareSync(password, user.password)) done(null, { msg: 'incorrect-password' })

                    done(user, null)
                })
                .catch(err => done(null, { err, msg: 'db-error' }))
        }

        if (req.session && req.session) req.user = req.session.user
        next()
    })
}