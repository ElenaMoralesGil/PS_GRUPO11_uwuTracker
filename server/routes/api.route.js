const app = require('express')()

app.use('/auth', require('./api/auth.route'))
app.use('/content', require('./api/content.route'))

module.exports = app 