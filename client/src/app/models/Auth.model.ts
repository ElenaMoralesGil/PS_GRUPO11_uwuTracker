import { Observable } from "rxjs";
import User from "../schemas/User.schema";

export default interface Auth {
  login: ({ username, password }: { username: string, password: string }) => Promise<Observable<User | null>>
    logout: () => Promise<void>
    isLoggedIn: () => Promise<Observable<User | null>>

    get user(): Observable<User | null>
}
