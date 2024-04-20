const Content = require('../../schemas/Content.schema');
const genresParser = require('./genres');

class JikanService {

    constructor() {
        this.contentpath = `${process.env.JIKAN_PATH}/anime`
        this.characterspath = `${process.env.JIKAN_PATH}/characters`
        this.seasonpath = `${process.env.JIKAN_PATH}/seasons`;
    }

    // Function to get a content by ID in Jikan
    findById = (id) => fetch(`${this.contentpath}/${id}`).then(res => res.json()).then(res => res.data).then(content => Content.parse(content)); // Works

    // Function to get the characters of a content finding by ID.
    animeCharacters = (id) => fetch(`${this.contentpath}/${id}/characters`).then(res => res.json()).then(res => res.data); // Works

    // Function to get the episodes of a content finding by ID.
    animeEpisodes = (id, page) => fetch(`${this.contentpath}/${id}/episodes?page=${page}`).then(res => res.json()); // Works

    // Function to get the images of a content finding by ID.
    animeImages = (id) => fetch(`${this.contentpath}/${id}/pictures`).then(res => res.json()).then(res => res.data); // Works

    // Function to get a characters description finding by character ID.
    findCharacter = (characterid) => fetch(`${this.characterspath}/${characterid}`).then(res => res.json()).then(res => res.data ? res.data : ''); // Works

    // Function to get a full content season finding by year and season.
    findSeasonContents = (year, season, format, page) => fetch(`${this.seasonpath}/${year}/${season}?${format !== '' ? `filter=${format}&` : ''}${page !== undefined ? `page=${page}` : ''}`).then(res => res.json()); // Works

    // Function to search for content based on Name, Genres and other few filters.
    findNameGenres = (name, genres, format, page) => fetch(`${this.contentpath}?${name !== "" ? `q=${name}&` : ''}${genres[0] !== '' ? `genres=${genres.join(',')}&` : ''}${format !== '' ? `type=${format}&` : ''}${page !== undefined ? `page=${page}` : ''}`).then(res => res.json()); // Works

    find({ name, genres, year, season, format, page }) {
        if (year && season) return this.findSeasonContents(year, season, format, page);
        return this.findNameGenres(name, genres[0] !== '' ? genres.map(elem => genresParser[elem]) : genres, format, page);
    }
}

module.exports = require('../../bin/Singleton')(new JikanService())

// NOTE: Existe una version del findByID del anime full fetch(`${this.contentpath}/${id}/full`)