
const Content = require('../schemas/Content.schema')


class Contents {
    #api
    #db
    constructor() {
        this.#api = require('../services/jikan/JikanContent.service')
        this.#db = require('../services/firebase/FirebaseContents.service')
    }

    findById = id => this.#db.findById(id).then(content => {

        if (content) return content

        return this.#api.findById(id).then(content => content ? this.#db.create(Content.parse({ ...content, id })) : null)

    }).then(content => content ? Content.parse(content) : null)

    findByName = name => this.#api.findByName(name).then(contents => contents.length ? contents.map(elm => Content.parse(elm)) : null)

    create = async content => this.#db.create(content).then(content => content ? Content.parse(content) : null)
}

module.exports = require(process.cwd() + '/bin/Singleton')(new Contents())
