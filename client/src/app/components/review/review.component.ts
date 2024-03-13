import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import Review from "../../schemas/Review.schema";
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

  constructor(
    private Reviews: ReviewService,
    private router: ActivatedRoute
  ) {}

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
      await this.Reviews.likeReview(this.id, this.user);
      // @ts-ignore
      this.likes++;
    } catch (error) {
      console.error(error);
    }
  }

  async dislikeReview() {
    try {
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
      const createdReview = await this.Reviews.createReview(this.user, this.content, this.score, this.title, this.description);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteReview(id: string) {
    try {
      await this.Reviews.deleteReview(id);

    } catch (error) {
      console.error(error);
    }
  }

  async editReview(title: string, description: string, score: number) {
    try {
      await this.Reviews.editReview(this.id, { title, description, score } as Review);
    } catch (error) {
      console.error(error);
    }
  }


}
