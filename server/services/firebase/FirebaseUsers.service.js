const User = require(process.cwd() + '/schemas/User.schema.js')


class FirebaseUsers {
    #fss
    #collection
    constructor() {
        this.#fss = require('./firebase.service')
    }

    findById = id => this.#fss.auth.getUser(id)

    create = user => this.#fss.auth.createUser(user.get())
}

module.exports = require('../../bin/Singleton')(new FirebaseUsers())