module.exports = class User {
    #name
    constructor(name) {
        this.#name = name
    }

    //set name(name) { this.#name = name }
    get name() { return this.#name }

    talk = () => console.log("Buenas")
}

