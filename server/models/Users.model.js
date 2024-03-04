const Singleton = require("../bin/Singleton")
const UsersServ = require('../models/Users.model')
const User = require("../schemas/User.schema")

class Users {

    #path
    constructor(path) {
        this.#path = path
    }
    get path() { return this.#path }

    findById = id => new User(UsersServ.findById(id))
}

module.exports = Singleton(new Users("alguna-ruta"))