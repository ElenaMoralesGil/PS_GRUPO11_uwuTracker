module.exports = class User {
    constructor(name) {
        this._name = name;
    }

    get name() { return this._name }
    set name(name) { this._name = name }

    talk = () => console.log("Buenas")
}