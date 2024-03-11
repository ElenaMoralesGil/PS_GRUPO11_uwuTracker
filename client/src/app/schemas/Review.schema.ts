import User from "./User.schema"

export default interface Review {
  readonly id: string

  title: string
  description: string
  score: number
  user:User
  like:number
  dislike:number
}
