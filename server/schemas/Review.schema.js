module.exports = class Review {
    #id

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
    getData() {
        return {
            id: this.id,
            userId: this.userId,
            score: this.score,
            content: this.content,
            description: this.description,
            title: this.title,
            likes: this.likes,
            dislikes: this.dislikes
        };
    }
    static parse = review=> {
        return new Review(review);
    }
    stringify = () => JSON.stringify(this)
    get = () => JSON.parse(JSON.stringify(this))
}