import { Component, Input, OnInit } from '@angular/core';
import Review from "../../schemas/Review.schema";
import { ReviewService } from '../../services/review.service';
import { AuthService } from "../../services/auth.service";
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgForOf
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
  @Input() reviewId?: string;
  @Input() isNewReview: boolean = false;

  editMode: boolean = false;
  showMode: boolean = false;
  showModal: boolean = true;
  userName?: string;

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.reviewId || this.isNewReview) {
      this.showMode = true;
      this.editMode = this.isNewReview;
      this.loadReviewData().then(r => console.log('Review loaded:', r));
    }
  }

  async loadReviewData() {
    try {
      if (this.reviewId) {
        // @ts-ignore
        this.review = await this.reviewService.findById(this.reviewId);
        this.userName = await this.authService.getUserName(this.review.user);
      } else if (this.isNewReview) {
        const contentId = this.review.content ?? ''; // Ensure content ID is not null or undefined
        this.review = {
          id: '',
          title: '',
          description: '',
          score: 0,
          user: 'ExCxLVBGoRg0WGlQCVbX',
          content: contentId,
          likes: 0,
          dislikes: 0
        };
      }
    } catch (error) {
      console.error('Error fetching review:', error);
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  async createOrUpdateReview() {
    try {
      if (!this.review || !this.review.user || !this.review.content || !this.review.score || !this.review.title || !this.review.description) {
        throw new Error('Review, User, Content, Score, Title, or Description is not defined');
      }
      if (this.review.id) {
        await this.reviewService.editReview(this.review.id, this.review.user, this.review.content, this.review.title, this.review.description, this.review.score);
      } else {
        await this.reviewService.createReview(this.review.user, this.review.content, this.review.score, this.review.title, this.review.description);
      }

      this.closeModal()
      this.editMode = false;

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
      // Handle success
    } catch (error) {
      console.error(error);
    }
  }
  isReviewOwner(): boolean {
    return true;
  }
}
