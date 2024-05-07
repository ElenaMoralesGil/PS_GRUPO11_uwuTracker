require('dotenv').config()

const app = require('express')()

require('./config/middleware.config')(app)

require('./config/http2https.config')(app)

require('./config/static.config')(app)

require('./config/debug.config')

require('./config/cors.config')(app)

require('./config/auth/session.config')(app)


app.use('/favicon', (req, res) => res.sendFile(__dirname + '/public/favicon.ico'))

// *=> base urls
app.use('/api', require('./routes/api.routes'))

//app.use((req, res) => res.sendFile(__dirname + '../public/index.html'))

module.exports = app