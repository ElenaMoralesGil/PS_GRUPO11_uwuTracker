import User from "../schemas/User.schema";

export default interface Users {
  findById: (id: string | null) => Promise<User> | null
  signUp: (username: string, email: string, password: string, country:string, description:string, profilePicture:string) => Promise<{ code: number, user: User }> | null
  signIn: (username: string, password: string) => Promise<User>  | null
}
