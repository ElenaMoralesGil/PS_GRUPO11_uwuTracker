const User = require("../schemas/User.schema")


class Users {
    #service
    constructor() {
        this.#service = require('../services/firebase/FirebaseUsers.service')
    }

    findById = id => this.#service.findById(id)
    find = queryObj => this.#service.find(queryObj)
    create = user => this.#service.create(user)
    update = (id, userProps) => this.#service.update(id, userProps)
    getContentsFromList = (userId, listField) => this.#service.getContentsFromList(userId, listField)
}

module.exports = require('../bin/Singleton')(new Users())
