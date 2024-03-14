module.exports = class Review {
    #id
    static MINBODYSIZE = 50;
    static MAXBODYSIZE = 1000;
    constructor({ user, content, body, title, id }) {
        this.#id = id;
        this.likes = 0;
        this.dislikes = 0;
        this.user = user;
        this.content = content;
        this.body = body;
        this.title = title;
    }

    static parse = review => new Review(review);
    //get = () => ({ ...this, id: this.#id })
    stringify = () => JSON.stringify({ ...this, id: this.#id })
}