import User from "../schemas/User.schema";
import Content from "../schemas/Content.schema";

export default interface Users {
  findById: (id: string) => Promise<User | null>
  findByUsername: (username: string) => Promise<User | null>
  find: (obj: Object) => Promise<Array<User>>
  findOne: (obj: Object) => Promise<User | null>
  signup: ({username, password, email}: { username: string, password: string, email: string }) => Promise<User | null>
  getContentsFromList: (userId: string, listField: string) => Promise<Array<Map<string, any> | null>>
  checkOnList: (userId: string | undefined, contentId: string | undefined, listField: string) => Promise<boolean>
  trackingList: (userId: string | undefined, contentId: string | undefined, listField: string) => Promise<void>
  isOnList: (userId: string | undefined, contentId: string | undefined) => Promise<string | null>
  incrementEpisodesCount: (userId: string | undefined, contentId: string | undefined) => Promise<number>
  decrementEpisodesCount: (userId: string | undefined, contentId: string | undefined) => Promise<number>

}
