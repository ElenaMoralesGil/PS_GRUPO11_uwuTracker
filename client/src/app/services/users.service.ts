import { __env } from '../../environments/env.dev';
import { Injectable } from '@angular/core';
import Users from '../models/User.model';
import User from '../schemas/User.schema';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements Users {
  private path: string
  constructor() {
    this.path = `${__env.API_PATH}/user`
  }

  findById: (id: string) => Promise<User | null> = id =>
    fetch(`${this.path}/id/${id}`).then(res => res.status == 200 ? res.json() : null)


  find: (obj: Object) => Promise<Array<User | null>> = obj => {
    let query = ""

    for (let [ key, val ] of Object.entries(obj))
      query += `&${key}=${val}`

    return fetch(`${this.path}/search?${query}`).then(res => res.status == 200 ? res.json() : null)
  }

  signup: ({ username, password, email }: { username: string, email: string, password: string }) => Promise<User | null> =
    ({ username, password, email }) => fetch(`${this.path}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email })
    })
      .then(res => res.status == 201 ? res.json() : null)
}
