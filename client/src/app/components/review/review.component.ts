import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import {AuthService}   from "../../services/auth.service";
import Users from "../../models/User.model";
import Review from "../../schemas/Review.schema";
import { FormsModule } from "@angular/forms";
import {CommonModule, NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgIf,
    NgForOf
  ],

  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() review: Review = {
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
  showMode: boolean = true;
  showModal: boolean = true;

  constructor(private reviewService: ReviewService, private route: ActivatedRoute, private router: Router, protected Users: AuthService) { }

  async ngOnInit() {
    const contentId = this.route.snapshot.paramMap.get("id");

    if (!contentId) {
      console.error('Content ID is missing.');
      return;
    }

    const reviewId = this.route.snapshot.paramMap.get("reviewId");
    console.log('Review ID:', reviewId);
    if (reviewId === null || reviewId === 'edit') {
      this.showModal = true;
      this.editMode = true;
      this.showMode = false;
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
    } else if (reviewId) {
      this.showModal = true;
      this.showMode = true;
      try {
        // @ts-ignore
        this.review = await this.reviewService.findById(reviewId);
      } catch (error) {
        console.error('Error fetching review:', error);
      }
    }
  }

  openModal() {
    this.showModal = true;
    this.editMode = this.router.url.includes('review/create');
  }

  closeModal() {

    this.showMode = false;
    this.showModal = false;
      // Navigate back to the current route
      window.location.href = '/content/' + this.review.content;
  }




  isReviewOwner(): boolean {
    return true; // Example implementation
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
}
