import Review from "./Review.schema"

export default interface Content {
    readonly id: string

    title: string
    synopsis: string
    score: number
    status: string
    episodesNumber: number
    type: string
    source: string
    duration: number
    coverImg: string
    backgroundImg: string
    year: Date
    season: string
    studio: string
    episodes: number
    comments: string
    genres: string[]
    reviews: string[]
    likes:number
    characters: string[]
}
