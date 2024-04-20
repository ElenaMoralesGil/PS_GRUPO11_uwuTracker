import { __env } from '../../environments/env.dev';

import { Injectable } from '@angular/core';

import Reviews from '../models/Review.model';
import Review from "../schemas/Review.schema";


@Injectable({
  providedIn: 'root'
})
export class ReviewService implements Reviews {
  private path: string;

  constructor() {
    this.path = `${__env.API_PATH}/review`;
  }

  likeReview = (userId: string, reviewId: string): Promise<number> =>
    fetch(`${this.path}/${reviewId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
      credentials: 'include'
    }).then(res => {
      if (!res.ok) throw new Error('Failed to like review');
      return res.json();
    }).then(data => data.likes)
      .catch(err => {
        console.error('Error liking review:', err);
        throw err;
      });

  dislikeReview = (userId: string, reviewId: string): Promise<number> =>
    fetch(`${this.path}/${reviewId}/dislike`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
      credentials: 'include'
    }).then(res => {
      if (!res.ok) throw new Error('Failed to dislike review');
      return res.json();
    }).then(data => data.likes)
      .catch(err => {
        console.error('Error disliking review:', err);
        throw err;
      });

  findById = (id: string | null): Promise<Review> | null =>
    fetch(`${this.path}/${id}`, { credentials: 'include' }).then(res => res.json()).catch(err => null)


  createReview(userId: string, content: string, score: number, title: string, description: string): Promise<Review> | null {
    return fetch(`${this.path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, content, score, title, description }),
      credentials: 'include'
    }).then(res => {
      if (!res.ok) throw new Error('Failed to create review');
      return res.json();
    });
  }

  deleteReview(id: string): Promise<void> {
    return fetch(`${this.path}/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    }).then(res => {
      if (!res.ok) throw new Error('Failed to delete review');
    });
  }

  editReview(id: string, title: string, description: string, score?: number): Promise<void> | null {
    return fetch(`${this.path}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title, description, score }),
      credentials: 'include'
    }).then(res => {
      if (!res.ok) throw new Error('Failed to edit review');
    });
  }


  async fetchReviewsByIds(reviewIds: string[]) {
    const reviews = await Promise.all(reviewIds.map(id => this.findById(id)));
    return reviews.filter(review => review !== null) as Review[];
  }
}
