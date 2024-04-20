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
  getCharacterById: (id: string) => Promise<any> = id => fetch(`${this.path}/character/${id}`, { credentials: 'include' })
    .then(res => res.json())
    .then(characters => characters || null)
    .catch(err => null)

  getEpisodes: (id: string) => Promise<any> = id => fetch(`${this.path}/${id}/episodes`, { credentials: 'include' })
    .then(res => res.json())
    .then(episodes => episodes || null)
    .catch(err => null)

  getCharacters: (id: string) => Promise<any> = id => fetch(`${this.path}/${id}/characters`, { credentials: 'include' })
    .then(res => res.json())
    .then(characters => characters || null)
    .catch(err => null)


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

    return fetch(`${this.path}/persistent-search?${query} `, { credentials: 'include' }).then(res => res.status == 200 ? res.json() : [])
  }


  like = (userId: string | undefined, contentId: string | undefined): Promise<number> => {
    const url = `${this.path}/${userId}/like/${contentId}`;
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
  async setScore(contentId: string, score: number, userId:String): Promise<void> {
    try {
      const url = `${this.path}/${contentId}/score`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({score, userId })
      });

      if (!response.ok) {
        throw new Error('Failed to update score');
      }

      // No need to return anything if successful
    } catch (error) {
      console.error('Error updating score:', error);
      throw error;
    }
  }
}
