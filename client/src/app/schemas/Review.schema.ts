import User from "./User.schema"
import Content from "./Content.schema";

export default interface Review {
  readonly id: string

  title: string
  description: string
  score: number
  user:User | string
  content:Content | string
  like:number
  dislike:number
}
