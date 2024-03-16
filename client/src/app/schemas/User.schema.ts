export default interface User {
    id?: string
    username: string
    password: string
    mail: string

    animeList: Array<string>

    country?: string
    profilePicture?: string
    description?: string
    socialNetworks: Array<string>
}