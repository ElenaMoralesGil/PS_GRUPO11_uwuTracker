import User from "../schemas/User.schema";

export default interface Users{
  findById: (id: string) => Promise<User> | null
  create: (user: User) => Promise<User> | null
  signIn: (username: string, email: string, password: string) => Promise<User> | null
}

function signIn(username: string, email: string, password: string) {

}


