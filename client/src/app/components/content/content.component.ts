import { Component, OnInit } from '@angular/core';
import { ApiContentService } from '../../services/api-content.service';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import Review from "../../schemas/Review.schema";
import { ReviewService } from '../../services/review.service';
import { ReviewComponent } from "../review/review.component";
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
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  id?: string;
  title?: string;
  reviewIds?: string[]; // Array of review IDs
  reviews: Review[] = []; // Array of full review objects
  isReviewCreationOpen: boolean = false;
  areReviewsVisible: boolean = false;

  constructor(
    private contentService: ApiContentService,
    private reviewService: ReviewService,
    private router: ActivatedRoute,
    private route: Router
  ) { }

  async ngOnInit() {
    try {
      const contentId = this.router.snapshot.paramMap.get("id") || "";
      const content = await this.contentService.findById(contentId);
      if (!content?.id) {
        console.error('Content not found or ID is undefined.');
        return;
      }

      this.id = content.id;
      this.title = content.title;

      if (content.reviews) {
        this.reviewIds = content.reviews;
        console.log('Review IDs:', this.reviewIds);

      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
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
    this.isReviewCreationOpen = !this.isReviewCreationOpen;
    this.route.navigate(['content', this.id, 'review', 'create']);
  }

  async showReviews() {
    if (!this.areReviewsVisible) {
      await this.fetchReviewsByIds(this.reviewIds);
      console.log('Reviews:', this.reviews);
      this.areReviewsVisible = true; // Mostrar las revisiones solo si no se están mostrando actualmente
    } else {
      this.areReviewsVisible = false; // Ocultar las revisiones si ya se están mostrando
    }
  }
}
