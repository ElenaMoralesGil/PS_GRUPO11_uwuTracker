
export default interface Review {
  readonly id: string

  title: string
  description: string
  score: number
  user: string
  content:string
  likes:number
  dislikes:number
}
