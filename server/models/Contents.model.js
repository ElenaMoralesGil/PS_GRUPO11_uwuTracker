const Content = require('../schemas/Content.schema')
const service = require('../services/firebase/FirebaseContent.service')


class Contents {
    #service
    constructor() {
        this.#service = service
    }

    findById = async id => this.#service.getById(id).then(content => Content.parse(content))

    create = async content => this.#service.create(content).then(content => content ? Content.parse(content) : null)
}

module.exports = require('../bin/Singleton')(new Contents())