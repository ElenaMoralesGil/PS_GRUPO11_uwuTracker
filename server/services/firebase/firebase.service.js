const { initializeApp } = require('firebase/app')
const { getFirestore, orderBy, endAt, startAt, limit, and, or } = require('firebase/firestore/lite')
const { getStorage } = require('firebase/storage')


class FirebaseService {
    #app
    #db
    #storage
    #auth

    #optParser
    constructor() {
        this.#app = initializeApp(JSON.parse(process.env.FIRE_API))

        this.#db = getFirestore(this.#app)
        this.#storage = getStorage(this.#app)

        this.#optParser = {
            limit: limit,
            orderBy: orderBy,
            endAt: endAt,
            startAt: startAt,
            join: {
                or: or,
                and: and
            }
        }
    }

    get app() { return this.#app }

    get db() { return this.#db }
    get storage() { return this.#storage }
    get auth() { return this.#auth }

    get optParser() { return this.#optParser }
}

module.exports = require(process.cwd() + '/bin/Singleton')(new FirebaseService())