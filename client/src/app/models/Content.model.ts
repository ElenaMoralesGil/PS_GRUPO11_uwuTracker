import Content from "../schemas/Content.schema";

export default interface Contents {
    findById: (id: string | undefined) => Promise<Content | null>
    find: (obj: Content) => Promise<Content[]>
    addLike: (userId: string | undefined, contentId: string | undefined) => Promise<boolean>
    //create: (content: Content) => Promise<Content> | null
}
