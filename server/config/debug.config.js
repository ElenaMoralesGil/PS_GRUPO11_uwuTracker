const app_name = require('../package.json').name
const debug = require('debug')(`${app_name}:${require('path').basename(__filename).split('.')[0]}`)