import Comment from '../schemas/Comment.schema'

export default interface Comments {
    findById: (id: string) => Promise<{ data?: Comment, error?: string, msg?: string, code: number }>
    find: (props: any, opts: { limit?: number, orderBy?: string, endAt?: number, startAt?: number, join?: 'or' | 'and', orderByDir?: 'asc' | 'desc' })
        => Promise<{ data?: Comment[], error?: string, msg?: string, code: number }>

    create: (comment: Comment) => Promise<{ data?: Comment, error?: string, msg?: string, code: number }>
    delete: (id: string) => Promise<{ error: string, msg: string, code: number }>
    update: (id: string, props: Comment) => Promise<{ data?: Comment, error?: string, msg?: string, code: number }>
}