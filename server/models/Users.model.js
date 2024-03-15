const User = require("../schemas/User.schema")

class Users {

    #path
    #service
    constructor(path) {
        this.#service = require('../services/firebase/FirebaseUsers.service')
    }
    get path() { return this.#path }

    findById = id => this.#service.findById(id)
    find = queryObj => this.#service.find(queryObj)
    create = user => this.#service.create(user)
    update = (id, userProps) => this.#service.update(id, userProps)

}

module.exports = require('../bin/Singleton')(new Users())