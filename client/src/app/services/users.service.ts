import { __env } from '../../environments/env.dev';
import { Injectable } from '@angular/core';
import Users from '../models/User.model';
import User from '../schemas/User.schema';
import Content from '../schemas/Content.schema';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements Users {
  private path: string

  constructor() {
    this.path = `${__env.API_PATH}/user`
  }

  getContentsFromList(userId: string, listField: string):Promise<Array<Map<string, string> | null>>{
    console.log('fetching contents from user', userId,"and list", listField);
    return fetch(`${this.path}/${userId}/contents/${listField}`).then(res => {
      if (res.status === 404) {
        return null;
      }
      if (res.status === 200) {
        return res.json();
      }
      throw new Error('Failed to fetch contents');
    }).catch(error => {
      console.error('ERROR:', error);
      return null;
    });
  }

  findById: (id: string) => Promise<User | null> = id =>
    fetch(`${this.path}/id/${id}`, { credentials: 'include' }).then(res => res.status == 200 ? res.json() : null)


  find: (obj: Object) => Promise<Array<User | null>> = obj => {
    let query = ""

    for (let [ key, val ] of Object.entries(obj))
      query += `&${key}=${val}`

    return fetch(`${this.path}/search?${query}`, { credentials: 'include' }).then(res => res.status == 200 ? res.json() : null)
  }

  findOne: (obj: Object) => Promise<User | null> = obj => {
    let query = ""

    for (let [ key, val ] of Object.entries(obj))
      query += `&${key}=${val}`

    return fetch(`${this.path}/search-one`, { credentials: 'include' }).then(res => res.status == 200 ? res.json() : null)
  }

  signup: ({ username, password, email }: { username: string, email: string, password: string }) => Promise<User | null> =
    ({ username, password, email }) => fetch(`${this.path}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email }),
      credentials: 'include'
    })
      .then(res => res.status == 201 ? res.json() : null)
}
