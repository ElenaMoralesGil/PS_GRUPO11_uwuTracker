
module.exports = class Content {
    #id
    constructor({ mal_id, title, synopsis, score, status, episodesNumber, episodes, type, source, duration, coverImg, backgroundImg, year, season, studio, id, reviews }) {
        // Initialize reviews array
        this.reviews = reviews || [];

        // Set other properties
        this.id = id || mal_id;
        this.score = score;
        this.title = title;
        this.synopsis = synopsis;
        this.status = status;
        this.episodesNumber = episodesNumber;
        this.type = type;
        this.source = source;
        this.duration = duration;
        this.coverImg = coverImg;
        this.backgroundImg = backgroundImg;
        this.year = year;
        this.season = season;
        this.studio = studio;
        this.episodes = episodes;
        this.comments = [];
    }

    //get id() { return this.#id }
    //get = () => ({ ...this, id: this.#id })

    static parse = content => {
        console.log('Parsed Content:', content);
        return new Content(content);
    }
    stringify = () => JSON.stringify(this)
    get = () => JSON.parse(JSON.stringify(this))
}
