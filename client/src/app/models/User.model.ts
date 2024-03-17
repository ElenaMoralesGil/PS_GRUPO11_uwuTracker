import User from "../schemas/User.schema";

export default interface Users {
  find: (obj: Object) => Promise<Array<User | null>>
  signup: ({ username, password, email }: { username: string, password: string, email: string }) => Promise<User | null>
}
