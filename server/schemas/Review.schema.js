module.exports = class Review {
    #id
    static MINBODYSIZE = 50;
    static MAXBODYSIZE = 1000;
    constructor({ user, content, body, title, id }) {
        this.id || id;
        this.likes = 0;
        this.dislikes = 0;
        this.user = user;
        this.content = content;
        this.body = body;
        this.title = title;
    }

    static parse = review=> {
        console.log('Parsed Review:', review);
        return new Review(review);
    }
    stringify = () => JSON.stringify(this)
    get = () => JSON.parse(JSON.stringify(this))
}