const User = require('../schemas/User.schema')
const db = require('../services/firebase/Users.firebase')
const api = require('../services/jikan/JikanContent.service')



class Users {
    #api
    #db
    constructor() {
        this.#api = api
        this.#db = db
    }

    findById = id => this.#db.findById(id).then(user => {

        if (user) return user

    }).then(user=> user? User.parse(user) : null)

    signUp = async user => {
        // Check if username already exists
        const existingUser = await this.#db.findByUsername(user.username);
        if (existingUser) {
            return { code: 480, user: null }; // User already exists
        }

        // Check if email already exists
        const existingEmail = await this.#db.findByEmail(user.email);
        if (existingEmail) {
            return { code: 460, user: null }; // Email already exists
        }

        // Perform sign-up
        const newUser = await this.#db.signUp(user);
        return { code: 201, user: User.parse(newUser) }; // Sign-up successful
    };

}

module.exports = require(process.cwd() + '/bin/Singleton')(new Users());