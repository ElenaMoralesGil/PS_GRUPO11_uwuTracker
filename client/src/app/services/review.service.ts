import { __env } from '../../environments/env.dev';

import { Injectable } from '@angular/core';

import Reviews from '../models/Review.model';
import Review from "../schemas/Review.schema";

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class ReviewService implements Reviews {
  private path: string;

  constructor() {
    this.path = `${__env.API_PATH}/review`;
  }

  findById = (id: string): Promise<Review> | null =>
    fetch(`${this.path}/${id}`).then(res => res.json()).catch(err => null)

  likeReview(id: string, userId: string): Promise<void> {
    return fetch(`${this.path}/${id}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    }).then(res => {
      if (!res.ok) throw new Error('Failed to like review');
    });
  }

  dislikeReview(id: string, userId: string): Promise<void> {
    return fetch(`${this.path}/${id}/dislike`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    }).then(res => {
      if (!res.ok) throw new Error('Failed to dislike review');
    });
  }

  createReview(userId: string | undefined, content: string | undefined, score: number | undefined, title: string | undefined, description: string | undefined): Promise<Review> | null {
    return fetch(`${this.path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, content, score, title, description })
    }).then(res => {
      if (!res.ok) throw new Error('Failed to create review');
      return res.json();
    });
  }

  deleteReview(id: string): Promise<void> {
    return fetch(`${this.path}/${id}`, {
      method: 'DELETE'
    }).then(res => {
      if (!res.ok) throw new Error('Failed to delete review');
    });
  }

  editReview(id: string, updatedReview: Review): Promise<void> {
    return fetch(`${this.path}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedReview)
    }).then(res => {
      if (!res.ok) throw new Error('Failed to edit review');
    });
  }

}
