const app = require('express')()

app.use('/auth', require('./api/auth.routes'))

module.exports = app 