import { Component, OnInit } from '@angular/core';
import { ApiContentService } from '../../../services/api-content.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import Review from "../../../schemas/Review.schema";
import { ReviewService } from '../../../services/review.service';
import { ReviewComponent } from "./review/review.component";
import { NgForOf, NgIf } from "@angular/common";

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
  styleUrls: [ './content.component.css' ]
})
export class ContentComponent implements OnInit {

  id?: string;
  title?: string;
  reviewIds?: string[]; // Array of review IDs
  reviews: Review[] = []; // Array of full review objects
  isReviewCreationOpen: boolean = false;
  areReviewsVisible: boolean = false;
  contentId: string | undefined;
  constructor(
    private contentService: ApiContentService,
    private reviewService: ReviewService,
    private router: ActivatedRoute,
    private route: Router
  ) { }

  async ngOnInit() {
    try {

      const parentRoute = this.router.parent;

      if (parentRoute) {

        parentRoute.params.subscribe(params => {
          this.contentId = params[ 'id' ];
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
        await this.showReviews()
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  }
  async handleReviewDeleted(reviewId: string): Promise<void> {
    if (!this.reviewIds) {
      return;
    }

    const index = this.reviewIds.indexOf(reviewId);
    if (index !== -1) {
      this.reviewIds.splice(index, 1);
    }
  }


  updateReview(updatedReview: Review) {
    this.areReviewsVisible = true;
    this.isReviewCreationOpen = false;

    const index = this.reviews?.findIndex(review => review.id === updatedReview.id);
    if (index !== -1) {
      this.reviews[ index ] = updatedReview;
      console.log('Updated review:', updatedReview);
    }
    console.log(this.reviews);


  }

  async fetchReviewsByIds(reviewIds: string[] | undefined): Promise<void> {
    if (!reviewIds) {
      console.error('Review IDs are undefined.');
      return;
    }

    try {
      this.reviews = await this.reviewService.fetchReviewsByIds(reviewIds);

    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }

  toggleReviewCreation(): void {
    this.isReviewCreationOpen = !this.isReviewCreationOpen
  }

  handleReviewModalClosed(): void {
    console.log("Modal closed, calling showReviews()");
    this.areReviewsVisible = true;
    this.isReviewCreationOpen = false;
  }

  async showReviews() {
    if (!this.isReviewCreationOpen) {
      await this.fetchReviewsByIds(this.reviewIds);
      this.areReviewsVisible = true;
      this.isReviewCreationOpen = false;
    } else {
      this.areReviewsVisible = false;
      this.isReviewCreationOpen = true;
    }
  }
  pushReview(reviewId: string) {

    this.reviewIds?.push(reviewId)
    this.isReviewCreationOpen = false;
    this.areReviewsVisible = true;
  }
}
