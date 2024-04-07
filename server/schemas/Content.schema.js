
module.exports = class Content {
    constructor({ mal_id, title, synopsis, score, status, episodesNumber, episodes, type, source, duration, coverImg, backgroundImg, images, trailer, year, season, studio, id, reviews, genres }) {
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
        this.coverImg = coverImg || images.jpg.large_image_url;
        this.backgroundImg = backgroundImg || trailer.images.maximum_image_url;
        this.year = year;
        this.season = season;
        this.studio = studio;
        this.genres = genres | []
        this.episodes = episodes;
        this.comments = [];
    }

    //get id() { return this.#id }
    //get = () => ({ ...this, id: this.#id })

    static parse = content => new Content(content)
    stringify = () => JSON.stringify(this)
    get = () => JSON.parse(JSON.stringify(this))
}
