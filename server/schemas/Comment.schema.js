module.exports = class Comment {
    constructor({ userId, contentId, body, title, id, father, level, comments, timestamp }) {
        this.id = id;
        this.userId = userId;
        this.contentId = contentId;
        this.father = father || null
        this.level = level || 0

        this.title = title;
        this.body = body;
        //this.comments = comments || [];
        this.timestamp = timestamp || new Date()
    }

    static parse = obj => new Comment(obj)
    stringify = () => JSON.stringify(this)
    get = () => JSON.parse(JSON.stringify(this))
}