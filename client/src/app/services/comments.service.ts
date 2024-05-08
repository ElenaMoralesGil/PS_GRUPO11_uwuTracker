import { __env } from '../../environments/env';

import { Injectable } from '@angular/core';

import Comments from '../models/Comments.model';
import Comment from '../schemas/Comment.schema';

@Injectable({
  providedIn: 'root'
})
export class CommentsService implements Comments {
  private path: string
  constructor() {
    this.path = `${__env.API_PATH}/comment`
  }

  findById: (id: string) => Promise<{ data?: Comment | undefined; error?: string | undefined; msg?: string | undefined; code: number; }> = id =>
    fetch(`${this.path}/${id}`, { credentials: 'include' })
      .then(async res => ({ code: res.status, ...(await res.json()) }))


  find: (props: any, opts: { limit?: number, orderBy?: string, endAt?: number, startAt?: number, join?: 'or' | 'and', orderByDir?: 'asc' | 'desc' })
    => Promise<{ data?: Comment[], error?: string, msg?: string, code: number }> = (props, opts) => {
      let query = ""

      // params
      for (let [ key, val ] of Object.entries(props))
        query += `&${key}=${val}`

      // opts
      for (let [ key, val ] of Object.entries(opts))
        query += `&${key}=${val}`

      return fetch(`${this.path}/find?${query}`, { credentials: 'include' })
        .then(async res => ({ code: res.status, ...(await res.json()) }))
    }


  create: (comment: Comment) => Promise<{ data?: Comment, error?: string, msg?: string, code: number }> = comment => {
    delete comment.comments

    return fetch(`${this.path}`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(comment) })
      .then(async res => ({ code: res.status, ...(await res.json()) }))
  }


  delete: (id: string) => Promise<{ error: string, msg: string, code: number }> = id =>
    fetch(`${this.path}/${id}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json' } })
      .then(async res => ({ code: res.status, ...(await res.json()) }))


  update: (id: string, props: Comment) => Promise<{ data?: Comment, error?: string, msg?: string, code: number }> = (id, props) => {
    delete props.comments
    return fetch(`${this.path} /${id}`, { method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(props) })
      .then(async res => ({ code: res.status, ...(await res.json()) }))
  }
}
