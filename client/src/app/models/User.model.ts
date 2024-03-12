import User from "../schemas/User.schema";


const Users: any= {
  findById: (id: string) => { /* implementation */ },
  create: (user: User) => { /* implementation */ },
  signIn: (username: string, email: string, password: string) => { /* implementation */ }
};

export default Users;
