import Content from "../schemas/Content.schema";

export default interface Contents {
    findById: (id: string | null) => Promise<Content | null>
    find: (params: Content, opts: { limit: number, orderBy: string, endAt: number, startAt: number, join: 'or' | 'and', orderByDir: string }) => Promise<Content[]>
    like: (userId: string | undefined, contentId: string | undefined) => Promise<number>

    //create: (content: Content) => Promise<Content> | null

    getAnimeCharacters: (id: string) => Promise<any>
    getCharacterById: (id: string) => Promise<any>
    getEpisodes: (id: string) => Promise<any>
    setScore: (contentId:string,score: number, userId:string) => Promise<void>

}
