const { initializeApp } = require('firebase/app')
const { getFirestore } = require('firebase/firestore/lite')
const { getStorage } = require('firebase/storage')
const { getAuth } = require('firebase/auth')

const admin = require('firebase-admin')


class FirebaseService {

    #app
    #admin

    #db
    #storage
    #auth

    constructor() {
        this.#app = initializeApp(JSON.parse(process.env.FIRE_API))
        this.#admin = admin.initializeApp({ credential: admin.credential.cert(JSON.parse(process.env.FIRE_ADMIN)) })

        this.#db = getFirestore(this.#app)
        this.#storage = getStorage(this.#app)

        this.#auth = getAuth(this.#app)
        this.#auth.setPersistence("NONE")
    }

    get app() { return this.#app }
    get admin() { return this.#admin }

    get db() { return this.#db }
    get storage() { return this.#storage }
    get auth() { return this.#auth }
}

module.exports = require(process.cwd() + '/bin/Singleton')(new FirebaseService())