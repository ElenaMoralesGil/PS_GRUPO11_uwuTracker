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

    #id

    constructor({name, password, mail}){
        this.#id = undefined;
        this.name = name;
        this.password = password;
        this.mail = mail;

        this.animeList = [];

        this.country = undefined;
        this.profilePicture = undefined;
        this.description = undefined;
        this.socialNetworks = [];
    }

    get id() {return this.#id}

}

