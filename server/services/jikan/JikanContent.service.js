class JikanService {

    #seasons = {
        autumm: {
            start: "10-01",
            end: "12-31"
        },
        summer: {
            start: "07-01",
            end: "09-30"
        },
        spring: {
            start: "04-01",
            end: "06-30"
        },
        winter: {
            start: "01-01",
            end: "03-31"
        }
    }

    constructor() {
        this.contentpath = `${process.env.JIKAN_PATH}/anime`
        this.characterspath = `${process.env.JIKAN_PATH}/characters`
    }

    // Primera funcionalidad.
    findById = (animeId) => fetch(`${this.contentpath}/${animeId}`).then(res => res.json()).then(res => res.data)
        .then(content => {
            content.genres = content.genres.map(elm => elm.name.toLowerCase())
            return content
        });

    // Segunda funcionalidad.
    animeSearch = ({ name, genres, year, season, type, page }) => {
        let [start_date, end_date] = this.#getDates(year, season);
        let searchURL = `${this.contentpath}?${name ? `q=${name}&` : ""}${genres ? `genres=${genres.join(",")}&` : ""}${start_date}${end_date}${type ? `genres=${type.join(",")}&` : ""}${page ? `page=${page}` : ""}`;

        return fetch(searchURL).then(res => res.json()).then(contents => {

            for (let i = 0; i < contents.data.length; i++)
                contents.data[i].genres = contents.data[i].genres.map(elm => elm.name.toLowerCase())

            return contents
        });
    };

    // Tercera funcionalidad.
    animeCharacters = (animeid) => fetch(`${this.contentpath}/${animeid}/characters`).then(res => res.json()).then(res => res.data);

    // Cuarta funcionalidad.
    animeEpisodes = (animeid) => fetch(`${this.contentpath}/${animeid}/episodes`).then(res => res.json()).then(res => res.data);

    // Quinta funcionalidad.
    animeImages = (animeid) => fetch(`${this.contentpath}/${animeid}/pictures`).then(res => res.json()).then(res => res.data);

    // Sexta funcionalidad.
    characterDescription = (characterid) => fetch(`${this.characterspath}/${characterid}`).then(res => res.json()).then(res => res.data.about);


    #getDates = (year, season) => {
        if (year && season) return [`start_date=${year}-${this.#seasons[season].start}&`, `end_date=${year}-${this.#seasons[season].end}&`]
        if (year) return [`start_date=${year}-01-01&`, end_date = `end_date=${year}-31-12&`]
        if (season) return [`start_date=2024-${this.#seasons[season].start}&`, `end_date=2024-${this.#seasons[season].end}&`]
        return ["", ""];
    }
}

module.exports = require('../../bin/Singleton')(new JikanService())

// NOTE: Existe una version del findByID del anime full fetch(`${this.contentpath}/${id}/full`)