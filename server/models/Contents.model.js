
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

    find = obj => this.#api.animeSearch(obj).then(contents => contents.data.length ? { ...contents, data: contents.data.map(elm => Content.parse(elm)) } : null)

    create = async content => this.#db.create(content).then(content => content ? Content.parse(content) : null)

    addLike = async (userId, contentId) => {return await this.#db.addLike(userId, contentId);}
}


module.exports = require(process.cwd() + '/bin/Singleton')(new Contents())
