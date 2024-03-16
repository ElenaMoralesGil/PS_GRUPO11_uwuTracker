import User from "./User.schema"

export default interface Review {
  readonly id: string | null
  title: string
  description: string
  score?: number
  user: string
  content: string
  likes: number
  dislikes: number
}
