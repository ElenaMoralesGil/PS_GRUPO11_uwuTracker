import { __env } from '../../environments/env.dev';

import { Injectable } from '@angular/core';

import Comments from '../models/Comments.model';
import Comment from '../schemas/Comment.schema';

@Injectable({
  providedIn: 'root'
})
export class CommentsService implements Comments {
  private path: string
  constructor() {
    this.path = `${__env.API_PATH}/comments`
  }

  findById: (id: string) => Promise<{ data?: Comment | undefined; error?: string | undefined; msg?: string | undefined; code: number; }> = id =>
    fetch(`${this.path}/${id}`, { credentials: 'include' })
      .then(res => ({ code: res.status, ...res.json() }))


  find: (props: Comment, opts: { limit?: number, orderBy?: string, endAt?: number, startAt?: number, join?: 'or' | 'and', orderByDir?: 'asc' | 'desc' })
    => Promise<{ data?: Comment[], error?: string, msg?: string, code: number }> = (props, opts) => {
      let query = ""

      // params
      for (let [ key, val ] of Object.entries(props))
        query += `&${key}=${val}`

      // opts
      for (let [ key, val ] of Object.entries(opts))
        query += `&${key}=${val}`

      return fetch(`${this.path}/find?${query}`, { credentials: 'include' })
        .then(res => ({ code: res.status, ...res.json() }))
    }


  create: (comment: Comment) => Promise<{ data?: Comment, error?: string, msg?: string, code: number }> = comment =>
    fetch(`${this.path}`, { method: 'PUT', credentials: 'include', body: JSON.stringify(comment) })
      .then(res => ({ code: res.status, ...res.json() }))


  delete: (id: string) => Promise<{ error: string, msg: string, code: number }> = id =>
    fetch(`${this.path}/${id}`, { method: 'DELETE', credentials: 'include' })
      .then(res => ({ code: res.status, ...res.json() }))


  update: (id: string, props: Comment) => Promise<{ data?: Comment, error?: string, msg?: string, code: number }> = (id, props) =>
    fetch(`${this.path}/${id}`, { method: 'PUT', credentials: 'include', body: JSON.stringify(props) })
      .then(res => ({ code: res.status, ...res.json() }))
}
