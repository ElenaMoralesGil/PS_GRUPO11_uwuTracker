import { __env } from '../../environments/env.dev';

import { Injectable } from '@angular/core';

import Reviews from "../models/Review.model";
import Review from '../schemas/Review.schema';
@Injectable({
  providedIn: 'root'
})

export class ReviewService implements Reviews {
  private path: string
  constructor() {
    this.path = `${__env.API_PATH}/review`
  }
  findById = (id: string): Promise<Review> | null =>
    fetch(`${this.path}/${id}`).then(res => res.json()).catch(err => null)

  create = (content: Review): Promise<Review> | null =>
    fetch(`${this.path}/review`, { method: 'POST' }).then(res => res.json()).catch(err => null)

}
