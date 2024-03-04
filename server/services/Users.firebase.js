const Singleton = require('../bin/Singleton')
const firebase = "import de firebase"


class FirebaseUsers {
    #path
    constructor() {
        this.#path = process.env.FB_DB
    }

    findbyId = id => firebase.findbyId(id)
}

module.exports = Singleton(new FirebaseUsers())