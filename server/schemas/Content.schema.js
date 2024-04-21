const { apiScoreNormalization, calcScore } = require('../bin/utils')


module.exports = class Content {
    constructor({ mal_id, title, ourScore, scoreCount, apiScore, synopsis, comments, genres, score, status, episodesNumber, episodes, type, source, duration, coverImg, backgroundImg, images, trailer, year, season, studios, id, reviews, likes }) {
        // Initialize reviews array
        this.reviews = reviews || [];

        // Set other properties
        this.id = id || mal_id;
        this.ourScore = ourScore || 0
        this.apiScore = mal_id ? score : apiScore
        this.scoreCount = scoreCount || 0
        this.score = mal_id ? apiScoreNormalization(apiScore) : score
        this.title = title;
        this.synopsis = synopsis;
        this.status = status;
        this.type = type;
        this.source = source;
        this.duration = duration;
        this.coverImg = coverImg || images?.jpg.large_image_url || trailer?.images?.maximum_image_url
        this.backgroundImg = backgroundImg || trailer?.images.maximum_image_url || images?.jpg.large_image_url
        this.year = year;
        this.season = season;
        this.comments = comments || [];
        this.likes = likes || 0

        this.episodesNumber = episodesNumber || episodes;
        this.episodes = this.episodesNumber

        this.genres = genres ? typeof genres[0] == "string" ? genres : genres.map(genre => genre.name.toLowerCase()) : []
        this.studios = studios ? typeof studios[0] == "string" ? studios : studios.map(studio => studio.name.toLowerCase()) : []
    }

    //get id() { return this.#id }
    //get = () => ({ ...this, id: this.#id })

    static parse = content => new Content(content)
    stringify = () => JSON.stringify(this)
    get = () => JSON.parse(JSON.stringify(this))
}
