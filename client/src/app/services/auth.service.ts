import { __env } from '../../environments/env';
import { Injectable } from '@angular/core';

import User from '../schemas/User.schema';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
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
    this.__loggedUser__.toPromise = () => firstValueFrom(this.__loggedUser__) as Promise<User | null>
  }

  login = ({ username, password }: { username: string, password: string }): Promise<number> =>
    fetch(`${this.path}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    })
      .then(res => {
        if (res.status === 202) {
          return res.json().then(data => {
            data?.user && this.userLogger.next(data.user);
            return 0;
          });
        } else {
          return res.status;
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
        return 450;
      });




  logout = (): Promise<void> => fetch(`${this.path}/logout`, { credentials: 'include' }).then(() => this.userLogger.next(null))

  isLoggedIn = (): Promise<Observable<User | null>> =>
    fetch(`${this.path}/isLoggedIn`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        data.user && this.userLogger.next(data.user)
        return this.__loggedUser__
      })

  get user(): Observable<User | null> { return this.__loggedUser__ }
}
