module.exports = class Review {
    #id
    static MINBODYSIZE = 50;
    static MAXBODYSIZE = 1000;
    constructor({ userId, content, description, title, id }) {
        this.id = id;
        this.likes = 0;
        this.dislikes = 0;
        this.userId = userId;
        this.content = content;
        this.description= description;
        this.title = title;
    }

    static parse = review=> {
        console.log('Parsed Review:', review);
        return new Review(review);
    }
    stringify = () => JSON.stringify(this)
    get = () => JSON.parse(JSON.stringify(this))
}