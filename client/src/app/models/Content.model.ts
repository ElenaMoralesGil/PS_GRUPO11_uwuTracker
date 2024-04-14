import Content from "../schemas/Content.schema";

export default interface Contents {
    findById: (id: string | null) => Promise<Content | null>
    find: (params: Content, opts: { limit: number, orderBy: string, endAt: number, startAt: number, join: 'or' | 'and', orderByDir: string }) => Promise<Content[]>
    //create: (content: Content) => Promise<Content> | null
}
