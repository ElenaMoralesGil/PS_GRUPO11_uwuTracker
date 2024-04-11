import Content from "../schemas/Content.schema";

export default interface Contents {
    findById: (id: string | undefined) => Promise<Content | null>
    find: (obj: Content) => Promise<Content[]>
    addLike: (userId:string, contentId:string) => Promise<boolean>
    //create: (content: Content) => Promise<Content> | null
}
