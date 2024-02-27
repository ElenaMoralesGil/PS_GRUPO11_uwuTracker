const bodyParser = require('body-parser')

module.exports = app => {
    app.use(require('morgan')('dev'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(require('cookie-parser')())
}