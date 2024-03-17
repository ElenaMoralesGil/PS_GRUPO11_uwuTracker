module.exports = class Review {
    #id
    static MINBODYSIZE = 50;
    static MAXBODYSIZE = 1000;
    constructor({ userId, score, content, description, title, id }) {
        this.id = id;
        this.likes = 0;
        this.dislikes = 0;
        this.userId = userId;
        this.content = content;
        this.score = score;
        this.description= description;
        this.title = title;
    }

    static parse = review=> {
        return new Review(review);
    }
    stringify = () => JSON.stringify(this)
    get = () => JSON.parse(JSON.stringify(this))
}