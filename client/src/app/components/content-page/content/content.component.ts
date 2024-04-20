import { Component, Input, OnInit } from '@angular/core';
import { ApiContentService } from '../../../services/api-content.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import Review from "../../../schemas/Review.schema";
import { ReviewService } from '../../../services/review.service';
import { ReviewComponent } from "./review/review.component";
import { NgForOf, NgIf } from "@angular/common";
import User from "../../../schemas/User.schema";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  standalone: true,
  imports: [
    ReviewComponent,
    NgForOf,
    NgIf,
    RouterOutlet
  ],
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  id?: string;
  title?: string;
  reviewIds?: string[]; // Array of review IDs
  reviews: Review[] = []; // Array of full review objects
  isReviewCreationOpen: boolean = false;
  areReviewsVisible: boolean = false;
  contentId: string | undefined;
  loggedUserId: string | undefined;

  constructor(
    private contentService: ApiContentService,
    private reviewService: ReviewService,
    private router: ActivatedRoute,
    private route: Router,
    private authService: AuthService,
  ) { }

  async ngOnInit() {
    try {
      this.authService.user.subscribe((user: User | null) => {
        this.loggedUserId = user?.id;
      });
      const parentRoute = this.router.parent;

      if (parentRoute) {
        parentRoute.params.subscribe(params => {
          this.contentId = params['id'];
        });
      }

      const content = await this.contentService.findById(<string>this.contentId);
      if (!content?.id) {
        console.error('Content not found or ID is undefined.');
        return;
      }

      this.id = content.id;
      this.title = content.title;

      if (content.reviews) {
        this.reviewIds = content.reviews;
        await this.showReviews();
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  }

  async handleReviewDeleted(reviewId: string): Promise<void> {
    try {
      if (!this.reviewIds) {
        return;
      }

      const index = this.reviewIds.indexOf(reviewId);
      if (index !== -1) {
        this.reviewIds.splice(index, 1);
      }

      // Remove the deleted review from the reviews array
      this.reviews = this.reviews.filter(review => review.id !== reviewId);

    } catch (error) {
      console.error('Error deleting review:', error);
    }
  }

  updateReview(updatedReview: Review) {
    try {
      this.areReviewsVisible = true;
      this.isReviewCreationOpen = false;

      const index = this.reviews?.findIndex(review => review.id === updatedReview.id);
      if (index !== -1) {
        this.reviews[index] = updatedReview;
        this.reviews = [...this.reviews];
      }
    } catch (error) {
      console.error('Error updating review:', error);
    }
  }

  async fetchReviewsByIds(reviewIds: string[] | undefined): Promise<void> {
    try {
      if (!reviewIds) {
        console.error('Review IDs are undefined.');
        return;
      }

      this.reviews = await this.reviewService.fetchReviewsByIds(reviewIds);

    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }

  async showReviews() {
    try {
      if (!this.isReviewCreationOpen) {
        await this.fetchReviewsByIds(this.reviewIds);
        this.areReviewsVisible = true;
        this.isReviewCreationOpen = false;
      } else {
        this.areReviewsVisible = false;
        this.isReviewCreationOpen = true;
      }
    } catch (error) {
      console.error('Error showing reviews:', error);
    }
  }

  pushReview(reviewId: string) {
    try {
      // Add the newly created review at the beginning of the list
      this.reviewIds?.unshift(reviewId);

      this.isReviewCreationOpen = false;
      this.areReviewsVisible = true;
    } catch (error) {
      console.error('Error pushing review:', error);
    }
  }

  toggleReviewCreation(): void {
    this.isReviewCreationOpen = !this.isReviewCreationOpen;
  }

  handleReviewModalClosed(): void {
    this.areReviewsVisible = true;
    this.isReviewCreationOpen = false;
  }

  hasUserReview(): boolean {
    return !!this.reviews.find(review => review.userId === this.loggedUserId);
  }

  getUserReviewId(): string {
    const userReview = this.reviews.find(review => review.userId === this.loggedUserId);
    return userReview ? <string>userReview.id : '';
  }

  isUserReview(reviewId: string): boolean {
    const review = this.reviews.find(review => review.id === reviewId);
    return <boolean>(review && review.userId === this.loggedUserId);
  }
}
