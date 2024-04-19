
const Content = require('../schemas/Content.schema')


class Contents {
    #api
    #db
    #opts
    constructor() {
        this.#api = require('../services/jikan/JikanContent.service')
        this.#db = require('../services/firebase/FirebaseContents.service')
        this.#opts = ['limit', 'orderBy', 'endAt', 'startAt', 'join', 'orderByDir']
    }

    get opts() { return this.#opts }

    findById = id => this.#db.findById(id).then(content => {

        if (content) return content

        return this.#api.findById(id).then(content => content ? this.#db.create(Content.parse({ ...content, id })) : null)

    }).then(content => content ? Content.parse(content) : null)

    find = obj => this.#api.find(obj).then(contents => contents.data.length ? { ...contents, data: contents.data.map(elm => Content.parse(elm)) } : null)
    persistenceFind = (obj, opt) => this.#db.find(obj, opt)
    create = async content => this.#db.create(content).then(content => content ? Content.parse(content) : null)
    like = async (userId, contentId) => this.#db.like(userId, contentId);

}


module.exports = require(process.cwd() + '/bin/Singleton')(new Contents())
