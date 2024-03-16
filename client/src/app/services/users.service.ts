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
    fetch(`${this.path}/${id}`).then(res => res.status == 200 ? res.json() : null)

  signin: ({ username, password }: { username: string, password: string }) => Promise<User | null> =
    ({ username, password }) => fetch(`${this.path}/signin`, { method: 'POST' })
      .then(res => res.status == 201 ? res.json() : null)
}
