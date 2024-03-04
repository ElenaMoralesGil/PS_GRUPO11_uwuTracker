module.exports = class Content {
    #id
    constructor({title, synopsis, score, status, episodesNumber, episodes, type, source, duration, coverImg, backgroundImg, year, season, studio}) {
        this.title = title;
        this.synopsis = synopsis;
        this.score = score;
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
        this.#id = undefined;
        this.episodes = episodes;
        this.comments = [];
        this.reviews = [];
    }
}