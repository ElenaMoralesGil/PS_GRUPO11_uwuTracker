const Content = require('../schemas/Content.schema')
const db = require('../services/firebase/FirebaseContent.service')
const api = require('../services/jikan/JikanContent.service')


class Contents {
    #api
    #db
    constructor() {
        this.#api = api
        this.#db = db
    }

    findById = async id => this.#db.findById(id).then(content => {

        if (content) return content

        return this.#api.findById(id).then(content => content ? this.#db.create({ ...content, id }) : null)

    }).then(content => content ? Content.parse(content) : null)

    create = async content => this.#db.create(content).then(content => content ? Content.parse(content) : null)
}

module.exports = require(process.cwd() + '/bin/Singleton')(new Contents())