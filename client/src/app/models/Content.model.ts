import Content from "../schemas/Content.schema";

export default interface Contents {
    findById: (id: string) => Promise<Content> | null
    create: (content: Content) => Promise<Content> | null
}