const cors = require('cors')

const whitelist = [process.env.DOMAIN]

module.exports = app => app.use(cors({
    origin: (origin, cb) => cb(null, whitelist.includes(origin)),
    credentials: true
}))