export default interface Comment {
    readonly id: string,
    readonly userId: string,
    readonly contentId: string,
    readonly father: string | null,
    readonly level: number,

    title: string,
    body: string,
    timestamp: Date
}