const app = require('express')()

app.use('/auth', require('./api/auth.route'))
app.use('/user', require('./api/user.route'))
app.use('/content', require('./api/content.route'))
app.use('/review', require('./api/review.route'))
module.exports = app