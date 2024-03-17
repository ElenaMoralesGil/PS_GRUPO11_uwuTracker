import { Component, Input, OnInit } from '@angular/core';
import Review from "../../schemas/Review.schema";
import { ReviewService } from '../../services/review.service';
import { AuthService } from "../../services/auth.service";
import { FormsModule } from "@angular/forms";
import { NgClass, NgForOf } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgForOf
  ],
  styleUrls: [ './review.component.css' ]
})
export class ReviewComponent implements OnInit {
  review: Review = {
    id: '',
    title: '',
    description: '',
    score: 0,
    userId: '',
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
  contentId: string = "";

  constructor(
    private reviewService: ReviewService,
    private userService: UsersService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.contentId = this.router.snapshot.paramMap.get("id") || "";
    if (this.reviewId || this.isNewReview) {
      this.showMode = true;
      this.editMode = this.isNewReview;
      this.loadReviewData().then(() => {
        console.log('Review loaded:', this.review);
        console.log(this.review.content);
        console.log('review:', this.review); // Move the console.log here
        console.log('userId:', this.review.userId);
        this.userService.findById(this.review.userId).then((user) => {
          console.log('user:', user);
          if (!user) return
          this.userName = user.username;
          console.log('username:', this.userName);
        });
      });
    }
  }

  async loadReviewData(): Promise<void> {
    try {
      if (this.reviewId) {
        // @ts-ignore
        this.review = await this.reviewService.findById(this.reviewId);
        if (this.review) {
          const user = await this.userService.findById(this.review.user as string)
        }
        console.log('ReviewInLoad:', this.review);

      } else if (this.isNewReview) {
        this.review = {
          id: '',
          title: '',
          description: '',
          score: 0,
          userId: '4enMqCeUxGJ2282lSHLN',
          content: this.contentId,
          likes: 0,
          dislikes: 0
        };
      }
      return Promise.resolve(); // Devuelve una promesa resuelta
    } catch (error) {
      console.error('Error fetching review:', error);
      return Promise.reject(error); // Devuelve una promesa rechazada en caso de error
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
      if (!this.review) {
        throw new Error('Review is not defined');
      }
      if (!this.review.userId) {
        throw new Error('User is not defined');
      }
      if (!this.review.content) {
        throw new Error('Content is not defined');
      }
      if (!this.review.score || !this.review.title || !this.review.description) {
        throw new Error('Review is not complete');
      }
      if (this.review.id) {
        await this.reviewService.editReview(this.review.id, this.review.userId, this.review.content, this.review.title, this.review.description, this.review.score);
      } else {
        await this.reviewService.createReview(this.review.userId, this.review.content, this.review.score, this.review.title, this.review.description);
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
