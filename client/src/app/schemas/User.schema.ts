export default interface User {
  readonly id: string
  username: string
  email: string
  password: string
  reviews: string[]
  description: string
  country: string
  profilePicture: string
  watching: string[]
  dropped: string[]
  completed: string[]
  planToWatch: string[]
  favorites: string[]
}
