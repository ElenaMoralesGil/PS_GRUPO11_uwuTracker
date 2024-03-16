const { initializeApp } = require('firebase/app')
const { getFirestore } = require('firebase/firestore/lite')
const { getStorage } = require('firebase/storage')


class FirebaseService {
    #app
    #db
    #storage
    #auth
    constructor() {
        this.#app = initializeApp(JSON.parse(process.env.FIRE_API))

        this.#db = getFirestore(this.#app)
        this.#storage = getStorage(this.#app)
    }

    get app() { return this.#app }

    get db() { return this.#db }
    get storage() { return this.#storage }
    get auth() { return this.#auth }
}

module.exports = require(process.cwd() + '/bin/Singleton')(new FirebaseService())