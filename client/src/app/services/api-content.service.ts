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
  private baseUrl = 'https://api.jikan.moe/v4/anime/';

  constructor() {
    this.path = `${__env.API_PATH}/content`
  }


  findById = (id: string | null): Promise<Content> | null =>
    fetch(`${this.path}/${id}`).then(res => res.json()).catch(err => null)

  create = (content: Content): Promise<Content> | null =>
    fetch(`${this.path}/content`, { method: 'POST', body: JSON.stringify(content) }).then(res => res.json()).catch(err => null)

  async getAnimeCharacters(animeId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}${animeId}/characters`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching anime characters:', error);
      return null;
    }
  }

}
