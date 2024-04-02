const bcrypt = require('bcrypt')

const { generateToken, extractToken } = require('./jwt.config')
const Users = require('../../models/Users.model')


const cookieName = 'session'
const cookieMeta = {
    maxAge: 360000,
    secure: process.env.ENV !== 'DEV',
    httpOnly: true,
}

const userValidator = (username, password) => Users.find({ username })
    .then(users => {

        if (!users || !users.length) return false
        const user = users[0]

        if (!bcrypt.compareSync(password, user.password)) return false

        return user
    })
    .catch(err => null)

const deserializer = (uid) => Users.findById(uid)

const login = async ({ req, res }, { username, password }) => {
    const user = await userValidator(username, password)
    if (!user) {
        req.user = null
        return null
    }

    req.user = user
    res.cookie(cookieName, `${await generateToken(user.id)}`, cookieMeta)
    return user
}

const logout = ({ req, res }) => {
    req.user = null
    res.cookie(cookieName, '', { maxAge: 0 })
}

const sessionMiddleware = () => {
    return async (req, res, next) => {

        req.login = (username, password) => login({ req, res, next }, { username, password })
        req.logout = () => logout({ req, res, next })

        if (!req.cookies[cookieName]) {
            req.user = null
            next()
            return
        }

        try {
            const { uid } = extractToken(req.cookies[cookieName])
            if (uid) {
                const user = await deserializer(uid)
                req.user = user
                if (user) res.cookie(cookieName, `${await generateToken(user.id)}`, cookieMeta)
            }
        } catch (err) {
            req.user = null
        }

        next()
    }
}

module.exports = app => {
    app.use(sessionMiddleware())
}