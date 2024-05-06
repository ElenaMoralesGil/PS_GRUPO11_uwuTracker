module.exports = class Review {
    #id

    constructor({ userId, score, content, description, title, id, likes, dislikes, timestamp }) {
        this.id = id;
        this.likes = likes;
        this.dislikes = dislikes;
        this.userId = userId;
        this.content = content;
        this.score = score;
        this.description = description;
        this.title = title;
        this.timestamp = timestamp || new Date()
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
            dislikes: this.dislikes,
            timestamp: this.timestamp
        };
    }
    static parse = review => {
        return new Review(review);
    }
    stringify = () => JSON.stringify(this)
    get = () => JSON.parse(JSON.stringify(this))
}