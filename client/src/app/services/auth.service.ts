import { __env } from '../../environments/env.dev';
import { Injectable } from '@angular/core';

import User from '../schemas/User.schema';
import { BehaviorSubject, Observable } from 'rxjs';
import AuthModel from '../models/Auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthModel {
  private path: string
  private userLogger: BehaviorSubject<User | null>
  private __loggedUser__!: Observable<User | null>
  constructor() {
    this.path = `${__env.API_PATH}/auth`

    this.userLogger = new BehaviorSubject<User | null>(null)
    this.__loggedUser__ = this.userLogger.asObservable()
  }

  login = ({ username, password }: { username: string, password: string }): Promise<Observable<User | null>> =>
    fetch(`${this.path}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.status == 202 ? res.json() : null)
      .then(data => {

        data?.user && this.userLogger.next(data.user)

        return this.__loggedUser__
      })

  logout = (): Promise<null> => fetch(`${this.path}/logout`).then(() => null)

  isLoggedIn = (): Promise<Observable<User | null>> =>
    fetch(`${this.path}/isLoggedIn`)
      .then(res => res.json())
      .then(data => {
        data.user && this.userLogger.next(data.user)
        return this.__loggedUser__
      })

  get user() { return this.__loggedUser__ }
}
