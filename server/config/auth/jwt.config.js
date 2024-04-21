const jwt = require('jsonwebtoken')

const generateToken = uid => {

    const payload = { uid }

    return new Promise((res, rej) => {
        jwt.sign(payload, process.env.SESSION_SECRET, {
            expiresIn: '24h'
        }, (err, token) => {
            err ? rej(err) : res(token)
        })
    })
}

const extractToken = token => {
    if (!token) return null

    try {
        return jwt.verify(token, process.env.SESSION_SECRET)
    } catch (err) {
        return null
    }
}

module.exports = { generateToken, extractToken }
