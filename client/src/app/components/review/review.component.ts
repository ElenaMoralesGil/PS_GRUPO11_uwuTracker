import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReviewService} from '../../services/review.service';
import Users from "../../models/User.model";




@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  standalone: true,
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  protected id?: string;
  protected title?: string;
  protected description?: string;
  protected score?: number;
  protected user?: string;
  protected content?: string;
  protected likes?: number;
  protected dislikes?: number;

  constructor(private Reviews: ReviewService, private router: ActivatedRoute) {}

  async ngOnInit() {
    let review
    try { review = await this.Reviews.findById(this.router.snapshot.paramMap.get("id") || "") }
    catch { return this.id = 'not-found' }

    if (!review?.id) return this.id = 'not found'

    this.id = review.id
    this.title = review.title
    this.description = review.description
    this.score = review.score
    this.user = review.user
    this.content = review.content
    this.likes = review.likes
    this.dislikes = review.dislikes

    return
  }

  async likeReview() {
    try {
      if (!this.id || !this.user) {
        throw new Error('ID or user is not defined');
      }
      await this.Reviews.likeReview(this.id, this.user);
      // @ts-ignore
      this.likes++;
    } catch (error) {
      console.error(error);
    }
  }

  async dislikeReview() {
    try {
      if (!this.id || !this.user) {
        throw new Error('ID or user is not defined');
      }
      await this.Reviews.dislikeReview(this.id, this.user);
      // @ts-ignore
      this.dislikes++;
    } catch (error) {
      console.error(error);
    }
  }


  isReviewOwner(): boolean {
    return this.user === Users.findById(this.user).name;
  }


  async createReview() {
    try {
      if (!this.user || !this.content || !this.score || !this.title || !this.description) {
        throw new Error('User, content, score, title, or description is not defined');
      }
      const createdReview = await this.Reviews.createReview(this.user, this.content, this.score, this.title, this.description);
      // Handle success
    } catch (error) {
      console.error(error);
    }
  }

  async deleteReview() {
    try {
      if (!this.id) {
        throw new Error('ID is not defined');
      }
      await this.Reviews.deleteReview(this.id);
      // Handle success, maybe refresh reviews list
    } catch (error) {
      console.error(error);
    }
  }

  async editReview() {
    try {
      if (!this.id || !this.user || !this.title || !this.description || !this.score) {
        throw new Error('ID, user, title, description, or score is not defined');
      }
      await this.Reviews.editReview(this.id, this.user, this.title, this.description, this.score);
      // Handle success, maybe refresh reviews list
    } catch (error) {
      console.error(error);
    }
  }


  protected readonly Users = Users;
}
