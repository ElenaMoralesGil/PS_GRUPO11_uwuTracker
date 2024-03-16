/*module.exports = class User {
    #name
    constructor(name) {
        this.#name = name
    }

    //set name(name) { this.#name = name }
    get name() { return this.#name }

    talk = () => console.log("Buenas")
}*/

module.exports = class User {

    constructor({ username, password, mail, id, uid }) {
        this.id = id | uid;
        this.username = username;
        this.password = password;
        this.mail = mail;

        this.animeList = [];
        /*
        {
            content:null,
            score:null,
            status:null,
            episodes:null
        }*/

        this.country = undefined;
        this.profilePicture = undefined;
        this.description = undefined;
        this.socialNetworks = [];
    }

    static parse = json => new User(json)
    stringify = () => JSON.stringify(this)
    get = () => JSON.parse(JSON.stringify(this))
}

