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
    this.path = `${__env.API_PATH}/auth`
  }

  getUserName = (id: string): Promise<string> =>
    fetch(`${this.path}/username/${id}`).then(res => res.json()).catch(err => null);

  getProfilePicture = (id: string): Promise<string> =>
    fetch(`${this.path}/profile-picture/${id}`).then(res => res.json()).catch(err => null);

  getCountry = (id: string): Promise<string> =>
    fetch(`${this.path}/country/${id}`).then(res => res.json()).catch(err => null);





  signUp = (username: string, email: string, password: string, country: string, description: string, profilePicture: string): Promise<{ code: number, user: User }> => {
    // @ts-ignore
    return fetch(`${this.path}/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password, country, description, profilePicture })
    })
      .then((res: Response) => {
        if (!res.ok) {
          throw new Error("HTTP error " + res.status);
        }
        return res.json();
      })
      .then((data: { code: number, user: User } | null) => {
        if (data === null) {
          throw new Error("Unexpected response from server");
        }
        return data;
      })
      .catch(err => {
        console.error(err);
        return null;
      });
  };


  signIn = (username: string, password: string): Promise<User> | null =>
    fetch(`${this.path}/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }).then(res => res.json()).catch(err => null);

  // @ts-ignore
  findById = (id: string): Promise<User>=>
    fetch(`${this.path}/${id}`).then(res => res.json()).catch(err => null)

}
