module.exports = class User {

    constructor({ username, password, email, id, reviews, country, description, profilePicture, watching, dropped, completed, planToWatch, favorites, userScores}) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.country = country;
        this.description = description;
        this.profilePicture = profilePicture;
        this.reviews = reviews || [];
        this.watching = watching || [];
        this.dropped = dropped || [];
        this.completed = completed || [];
        this.planToWatch = planToWatch || [];
        this.favorites = favorites|| [];
        this.userScores=  userScores || [];

    }

    static parse = json => new User(json)
    stringify = () => JSON.stringify(this)
    get = () => JSON.parse(JSON.stringify(this))
}
