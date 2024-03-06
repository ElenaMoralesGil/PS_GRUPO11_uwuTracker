const Content = require('../schemas/Content.schema')
const service = require('../services/firebase/FirebaseContent.service')


class Contents {
    #service
    constructor() {
        this.#service = service
    }

    findById = async id => this.#service.findById(id).then(content => content ? Content.parse(content) : null)

    create = async content => this.#service.create(content).then(content => content ? Content.parse(content) : null)
}

module.exports = require(process.cwd() + '/bin/Singleton')(new Contents())