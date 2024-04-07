import User from "../schemas/User.schema";
import Content from "../schemas/Content.schema";

export default interface Users {
  find: (obj: Object) => Promise<Array<User | null>>
  signup: ({ username, password, email }: { username: string, password: string, email: string }) => Promise<User | null>
  getContentsFromList: (userId: string, listField: string) => Promise<Array<Map<string,any> | null>>


}
