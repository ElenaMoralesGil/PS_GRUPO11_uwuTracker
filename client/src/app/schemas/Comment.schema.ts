export default interface Comment {
    readonly id?: string,
    readonly userId: string,
    readonly username: string,
    readonly contentId: string,
    readonly father: string | null,
    readonly level: number,

    body: string,
    timestamp?: Date
    comments?: Comment[]
}