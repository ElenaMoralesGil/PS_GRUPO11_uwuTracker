module.exports = class Comment {
    #id
    static MINBODYSIZE = 1;
    static MAXBODYSIZE = 150;
    constructor({user, content, body, title}) {
        this.#id = undefined;
        this.likes = 0;
        this.dislikes = 0;
        this.user = user;
        this.content = content;
        this.body = body;
        this.title = title;
        this.comments = [];
    }

    get id (){return this.#id}
}