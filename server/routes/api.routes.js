const app = require('express')()

app.use('/auth', require('./api/auth.routes'))
app.use('/user', require('./api/user.routes'))
app.use('/content', require('./api/content.routes'))
app.use('/review', require('./api/review.routes'))
app.use('/comment', require('./api/comment.routes'))
module.exports = app