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
  protected title?: string;
  protected description?: string;
  protected score?: number;
  protected id?: string;
  protected user?: string;
  protected content?: string;
  protected likes?: number;
  protected dislikes?: number;

  constructor(
    private Reviews: ReviewService,
    private router: ActivatedRoute
  ) {}

  async ngOnInit() {
    // Existing code
  }

  async likeReview(id: string) {
    try {
      await this.Reviews.likeReview(id, this.currentUser.id);
      this.likes++;
    } catch (error) {
      console.error(error);
    }
  }

  async dislikeReview(id: string) {
    try {
      await this.Reviews.dislikeReview(id, this.currentUser.id);
      this.dislikes++;
    } catch (error) {
      console.error(error);
    }
  }

  isReviewOwner(): boolean {
    return this.user === currentUser.id;
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

  async editReview(id: string, updatedReview: Review) {
    try {
      await this.Reviews.editReview(id, updatedReview);
    } catch (error) {
      console.error(error);
    }
  }


}
