const Content = require('../schemas/Content.schema')

class Contents {
    #db
    #opts
    constructor() {
        this.#db = require('../services/firebase/FirebaseComments.service')
        this.#opts = ['limit', 'orderBy', 'endAt', 'startAt', 'join', 'orderByDir']
    }

    get opts() { return this.#opts }

    findById = id => this.#db.findById(id)
    find = (props, opts) => this.#db.find(props, opts)

    create = comment => this.#db.create(comment)
    delete = id => this.#db.delete(id)
    update = (id, comment) => this.#db.update(id, comment)

}

module.exports = require('../bin/Singleton')(new Contents())