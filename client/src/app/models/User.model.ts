import User from "../schemas/User.schema";

export default interface Users {
  findById: (id: string) => Promise<User | null>
  find: (obj: Object) => Promise<Array<User | null>>
  findOne: (obj: Object) => Promise<User | null>
  signup: ({ username, password, email }: { username: string, password: string, email: string }) => Promise<User | null>
}
