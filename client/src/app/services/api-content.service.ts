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

  findById = (id: string | undefined): Promise<Content | null> =>
    fetch(`${this.path}/${id}`, { credentials: 'include' }).then(res => res.json())

  find = (obj: Object): Promise<Content[]> => {
    let query = ""
    for (let [ key, value ] of Object.entries(obj))
      query += `&${key}=${value}`

    return fetch(`${this.path}?${query}`, { credentials: 'include' }).then(res => res.status == 200 ? res.json() : [])
  }

  addLike = (userId: string | undefined, contentId: string | undefined): Promise<boolean> =>
    fetch(`${this.path}/${userId}/addLike/${contentId}`, { method: 'POST', credentials: 'include' })
      .then(res => res.status === 200)
      .catch(err => {
        console.error('Error adding like:', err);
        return false;
      });

  // create = (content: Content): Promise<Content> | null =>
  //   fetch(`${ this.path } / content`, { method: 'POST', body: JSON.stringify(content) }).then(res => res.json()).catch(err => null)

}
