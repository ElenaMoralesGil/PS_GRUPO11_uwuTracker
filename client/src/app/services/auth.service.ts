import { __env } from '../../environments/env.dev';

import { Injectable } from '@angular/core';
import User from '../schemas/User.schema';
import Users from '../models/User.model';


@Injectable({
  providedIn: 'root'
})
  export class AuthService implements Users {
  private path: string

  constructor() {
    this.path = `${__env.API_PATH}/content`
  }

  signUp = (username: string, email: string, password: string): Promise<User> | null =>
    fetch(`${this.path}/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    }).then(res => res.json()).catch(err => null)

  signIn = (username: string, password: string): Promise<User> | null =>
    fetch(`${this.path}/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }).then(res => res.json()).catch(err => null)

  // @ts-ignore
  findById = (id: string): Promise<User>=>
    fetch(`${this.path}/${id}`).then(res => res.json()).catch(err => null)

}
