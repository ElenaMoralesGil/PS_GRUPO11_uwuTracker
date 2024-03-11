const Singleton = require("../bin/Singleton")
const service = require('../services/Users.firebase')
const User = require("../schemas/User.schema")

class Users {

    #path
    #service
    constructor(path) {
        this.#path = path
        this.#service = service
    }
    get path() { return this.#path }

    findById = id => new User(this.#service.findById(id))
}

module.exports = Singleton(new Users("alguna-ruta"))