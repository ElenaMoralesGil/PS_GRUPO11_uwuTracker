const { initializeApp } = require('firebase/app')
const { getFirestore } = require('firebase/firestore/lite')
const { getStorage } = require('firebase/storage')
const { getAuth } = require('firebase/auth')


const firebaseConfig = {
    apiKey: process.env.FIRE_API_KEY,
    authDomain: process.env.FIRE_AUTH_DOMAIN,
    projectId: process.env.FIRE_PROJECT_ID,
    storageBucket: process.env.FIRE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIRE_MESSAGING_SENDER_ID,
    appId: process.env.FIRE_SENDER_ID,
    measurementId: process.env.FIRE_MEASUREMENT_ID
}

class FirebaseService {

    #app
    #db
    #storage
    #auth

    constructor() {
        this.#app = initializeApp(firebaseConfig)
        this.#db = getFirestore(this.#app)
        this.#storage = getStorage(this.#app)
        this.#auth = getAuth(this.#app)
    }

    get app() { return this.#app }
    get db() { return this.#db }
    get storage() { return this.#storage }
    get auth() { return this.#auth }
}

module.exports = require(process.cwd() + '/bin/Singleton')(new FirebaseService())