const session = require('express-session')

module.exports = app => {
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 360000,
            secure: process.env.ENV !== 'DEV',
            httpOnly: true
        }
    }))
}