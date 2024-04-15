import { __env } from '../../environments/env.dev';

import { Injectable } from '@angular/core';
import Content from '../schemas/Content.schema';
import Contents from '../models/Content.model';
import Review from "../schemas/Review.schema";

@Injectable({
  providedIn: 'root'
})
export class ApiContentService implements Contents {
  private path: string
  constructor() {
    this.path = `${__env.API_PATH}/content`
  }

  findById = (id: string | null): Promise<Content | null> =>
    fetch(`${this.path}/${id}`, { credentials: 'include' }).then(res => res.json())

  find = (params: Object, opts: { limit: number, orderBy: string, endAt: number, startAt: number, join: 'or' | 'and', orderByDir: string }): Promise<Content[]> => {
    let query = ""

    // params
    for (let [ key, value ] of Object.entries(params))
      if (key === 'genres' || key === 'studios') query += `${key}=${value.join(',')}`
      else query += `&${key}=${value}`

    // opts
    for (let [ key, value ] of Object.entries(opts))
      query += `&${key}=${value}`

    return fetch(`${this.path}?${query} `, { credentials: 'include' }).then(res => res.status == 200 ? res.json() : [])
  }

  like = (userId: string | undefined, contentId: string | undefined): Promise<number> => {
    const url = `${this.path}/${userId}/like/${contentId}`;
    console.log('Requesting URL:', url); // Log the constructed URL
    return fetch(url, { method: 'POST', credentials: 'include' })
      .then(res => {
        if (res.status === 200) {
          return res.json(); // Return the response directly
        } else {
          throw new Error('Failed to add like');
        }
      })
      .then(likes => {
        return likes; // Return the received likes
      })
      .catch(err => {
        console.error('Error adding like:', err);
        throw err;
      });
  }


  // create = (content: Content): Promise<Content> | null =>
  //   fetch(`${ this.path } / content`, { method: 'POST', body: JSON.stringify(content) }).then(res => res.json()).catch(err => null)

}
