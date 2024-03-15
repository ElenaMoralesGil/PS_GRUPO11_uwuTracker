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
    fetch(`${this.path}/${id}`)
      .then(res => {
        console.log("Response status:", res.status);
        return res.json();
      })
      .then(data => {
        console.log("Response data:", data);
        return data;
      })
      .catch(err => {
        console.error("Error fetching review:", err);
        return null;
      });
  likeReview(id: string, userId: string ): Promise<void> | null {
    return fetch(`${this.path}/${id}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    }).then(res => {
      if (!res.ok) throw new Error('Failed to like review');
    });
  }

  dislikeReview(id: string, userId: string ): Promise<void> | null {
    return fetch(`${this.path}/${id}/dislike`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    }).then(res => {
      if (!res.ok) throw new Error('Failed to dislike review');
    });
  }

  createReview(userId: string, content: string , score: number, title: string , description: string): Promise<Review> | null {
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

  editReview(id: string, user: string, content: string, title: string, description: string, score?: number): Promise<void> | null {
    return fetch(`${this.path}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, user, title, description, score })
    }).then(res => {
      if (!res.ok) throw new Error('Failed to edit review');
    });
  }


}
