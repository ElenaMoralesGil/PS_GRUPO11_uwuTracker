import { __env } from '../../environments/env.dev';

import { Injectable } from '@angular/core';
import Content from '../schemas/Content.schema';
import Contents from '../models/Content.model';

@Injectable({
  providedIn: 'root'
})
export class ApiContentService implements Contents {
  private path: string
  constructor() {
    this.path = `${__env.API_PATH}/content`
  }

  findById = (id: string): Promise<Content> | null =>
    fetch(`${this.path}/${id}`).then(res => res.json()).then(json => JSON.parse(json))

  create = (content: Content): Promise<Content> | null =>
    fetch(`${this.path}/content`, { method: 'POST' }).then(res => res.json()).then(json => JSON.parse(json))
}
