import { __env } from '../../environments/env.dev';
import { Injectable } from '@angular/core';
import Users from '../models/User.model';
import User from '../schemas/User.schema';
import Content from '../schemas/Content.schema';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements Users {
  private path: string

  constructor() {
    this.path = `${__env.API_PATH}/user`
  }

  findByUsername: (username: string) => Promise<User | null> = username =>
    fetch(`${this.path}/${username}`).then(res => res.json())

  getContentsFromList(userId: string, listField: string): Promise<Array<Map<string, string> | null>> {
    console.log('fetching contents from user', userId, "and list", listField);
    return fetch(`${this.path}/${userId}/contents/${listField}`).then(res => {
      if (res.status === 404) {
        return null;
      }
      if (res.status === 200) {
        return res.json();
      }
      throw new Error('Failed to fetch contents');
    }).catch(error => {
      console.error('ERROR:', error);
      return null;
    });
  }

  findById: (id: string) => Promise<User | null> = id =>
    fetch(`${this.path}/id/${id}`, {credentials: 'include'}).then(res => res.status == 200 ? res.json() : null)


  find: (obj: Object) => Promise<Array<User>> = obj => {
    let query = ""

    for (let [key, val] of Object.entries(obj))
      query += `&${key}=${val}`

    return fetch(`${this.path}/search?${query}`, {credentials: 'include'}).then(res => res.status == 200 ? res.json() : [])
  }

  findOne: (obj: Object) => Promise<User | null> = obj => {
    let query = ""

    for (let [key, val] of Object.entries(obj))
      query += `&${key}=${val}`

    return fetch(`${this.path}/search-one`, {credentials: 'include'}).then(res => res.status == 200 ? res.json() : null)
  }

  signup: ({username, password, email}: { username: string, email: string, password: string }) => Promise<User | null> =
    ({username, password, email}) => fetch(`${this.path}/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password, email}),
      credentials: 'include'
    })
      .then(res => res.status == 201 ? res.json() : null)

  checkOnList = (userId: string | undefined, contentId: string | undefined, listField: string): Promise<boolean> => {
    const url = `${this.path}/${userId}/check-list/${contentId}/${listField}`;
    console.log('Requesting URL:', url);
    return fetch(url, {method: 'GET', credentials: 'include'})
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Failed to check on list');
        }
      })
      .then(result => {
        return result.isOnList;
      })
      .catch(err => {
        console.error('Error checking on list:', err);
        throw err;
      });
  }

  trackingList = async (userId: string | undefined, contentId: string | undefined, listField: string): Promise<void> => {
    const url = `${this.path}/${userId}/${contentId}/tracking-list/${listField}`;
    const body = JSON.stringify({contentId});

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to add content to list');
      }
    } catch (error) {
      console.error('Error adding content to list:', error);
      throw error;
    }
  };
  isOnList = (userId: string | undefined, contentId: string | undefined): Promise<string | null> => {
    const url = `${this.path}/${userId}/check-list/${contentId}`;
    console.log('Requesting URL:', url);
    return fetch(url, {method: 'GET', credentials: 'include'})
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Failed to check on list');
        }
      })
      .then(result => {
        if (result.isOnList) {
          return result.listName; // Return the name of the list where contentId is found
        } else {
          return null; // Return null if contentId is not on any list
        }
      })
      .catch(err => {
        console.error('Error checking on list:', err);
        throw err;
      });
  };

  incrementEpisodesCount(userId: string | undefined, contentId: string | undefined): Promise<number> {
    const url = `${this.path}/${userId}/${contentId}/increment-episodes-count`;

    return fetch(url, {
      method: 'POST',
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to increment episodes count');
        }
        return response.json();
      })
      .then(data => {
        return data.episodesCount;
      })
      .catch(error => {
        console.error('Error incrementing episodes count:', error);
        throw error;
      });
  }
  decrementEpisodesCount(userId: string | undefined, contentId: string | undefined): Promise<number> {
    const url = `${this.path}/${userId}/${contentId}/decrement-episodes-count`;

    return fetch(url, {
      method: 'POST',
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to increment episodes count');
        }
        return response.json();
      })
      .then(data => {
        return data.episodesCount;
      })
      .catch(error => {
        console.error('Error incrementing episodes count:', error);
        throw error;
      });
  }
}
