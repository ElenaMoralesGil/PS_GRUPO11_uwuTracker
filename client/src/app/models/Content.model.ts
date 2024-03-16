import Content from "../schemas/Content.schema";

export default interface Contents {
    findById: (id: string | null) => Promise<Content> | null
    create: (content: Content) => Promise<Content> | null
}
