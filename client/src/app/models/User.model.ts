import User from "../schemas/User.schema";

export default interface Users {
  findById: (id: string) => Promise<User | null>
  signin: ({ username, password }: { username: string, password: string }) => Promise<User | null>
}
