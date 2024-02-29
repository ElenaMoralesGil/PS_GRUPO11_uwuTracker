const Singleton = require("../bin/Singleton")
const User = require("../schemas/User.schema")

class Users {
    #path
    constructor(path) {
        this.#path = path
    }
    get path() { return this.#path }

    findById = id => {
        console.log("todavia no esta implementado")
        return new User("Hola")
    }
}

module.exports = Singleton(new Users("alguna-ruta"))