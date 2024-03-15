import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import Users from "../../models/User.model";
import Review from "../../schemas/Review.schema";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  styleUrls: ['./review.component.css']
})

export class ReviewComponent implements OnInit {
  review: Review = {
    id: '',
    title: '',
    description: '',
    score: 0,
    user: '',
    content: '',
    likes: 0,
    dislikes: 0
  };
  editMode: boolean = false;
  showMode: boolean = false;
  constructor(private reviewService: ReviewService, private route: ActivatedRoute) {}


  async ngOnInit() {
    const contentId = this.route.snapshot.paramMap.get("id");
    console.log('Review Component Initialized with Content ID:', contentId);

    if (!contentId) {
      console.error('Content ID is missing.');
      return;
    }

    const reviewId = this.route.snapshot.paramMap.get("reviewId");
    console.log('Review ID:', reviewId);
    if (reviewId === null || reviewId === 'edit') { // If in create or edit mode
      console.log('Creating new review...');
      // Creating new review
      this.editMode = true; // Set edit mode to true for create operation
      this.showMode = false; // Set show mode to true when in create or edit mode
      this.review = {
        id: '', // Set ID to null for new review
        title: '',
        description: '',
        score: 0,
        user: '', // Populate with user ID if needed
        content: contentId, // Assign contentId to the content property
        likes: 0,
        dislikes: 0
      }

      console.log('New Review Object:', this.review); // Log the review object
    } else if (reviewId) {
      console.log('Viewing existing review with ID:', reviewId);
      // Viewing existing review
      this.showMode = true; // Set show mode to true when viewing existing review
      try {
        // @ts-ignore
        this.review = await this.reviewService.findById(reviewId);
        console.log('Fetched Review:', this.review);
      } catch (error) {
        console.error('Error fetching review:', error);
      }
    }
  }

  async likeReview() {
    // @ts-ignore
    this.reviewService.likeReview(this.review.id, this.review.user)
      .then(() => this.review.likes++)
      .catch(error => console.error(error));
  }

  async dislikeReview() {
    // @ts-ignore
    this.reviewService.dislikeReview(this.review.id, this.review.user)
      .then(() => this.review.dislikes++)
      .catch(error => console.error(error));
  }

  isReviewOwner(): boolean {
    return true;
  }

  async createOrUpdateReview() {
    console.log('content id' + this.review.content)
    try {
      if (!this.review) {
        throw new Error('Review is not defined');
      }
      if (!this.review.user) {
        throw new Error('User is not defined');

      } if ( !this.review.content) {
        throw new Error('Content is not defined');

      }
      if ( !this.review.score) {
        throw new Error('Score is not defined');
      } if (!this.review.title || !this.review.description) {
        throw new Error('Title or Description is not defined');
      }
      if (this.review.id) {
        // Update existing review
        await this.reviewService.editReview(this.review.id, this.review.user, this.review.content, this.review.title, this.review.description, this.review.score);
      } else {
        // Create new review
        await this.reviewService.createReview(this.review.user, this.review.content, this.review.score, this.review.title, this.review.description);
      }
      this.editMode = false; // Reset edit mode after creation/update
    } catch (error) {
      console.error(error);
    }
  }

  async deleteReview() {
    try {
      if (!this.review.id) {
        throw new Error('ID is not defined');
      }
      await this.reviewService.deleteReview(this.review.id);
      // Handle success, maybe refresh reviews list
    } catch (error) {
      console.error(error);
    }
  }
  protected readonly Users = Users;
}
