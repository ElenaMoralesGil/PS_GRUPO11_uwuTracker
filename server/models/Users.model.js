const User = require("../schemas/User.schema")

class Users {

    #path
    #service
    constructor(path) {
        this.#service = require('../services/firebase/FirebaseUsers.service')
    }
    get path() { return this.#path }

    findById = id => this.#service.findById(id).them(user => new User(user))
    create = content => this.#service.create(content).them(user => new User(user))
}

module.exports = require('../bin/Singleton')(new Users())