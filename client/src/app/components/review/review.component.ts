import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Review from "../../schemas/Review.schema";
import { ReviewService } from '../../services/review.service';
import { AuthService } from "../../services/auth.service";
import { FormsModule } from "@angular/forms";
import { AsyncPipe, NgClass, NgForOf, NgIf } from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import { UsersService } from '../../services/users.service';
import User from '../../schemas/User.schema';
import { Observable } from 'rxjs';;
import {Router} from "@angular/router"
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgForOf,
    NgIf,
    AsyncPipe,
    RouterLink
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

  @Input() reviewId?: string | null;
  @Input() isNewReview: boolean = false;

  @Output() reviewDeleted: EventEmitter<string> = new EventEmitter();
  @Output() newReview = new EventEmitter();
  @Output() editReviewClicked: EventEmitter<Review> = new EventEmitter();
  @Output() reviewUpdated: EventEmitter<Review> = new EventEmitter();

  editMode: boolean = false;
  showMode: boolean = false;
  showModal: boolean = true;

  userName?: string;
  pfp?:string;
  contentId: string = "";
  loggedInUser: Observable<User | null>

  constructor(
    private reviewService: ReviewService,
    private userService: UsersService,
    private router: ActivatedRoute,
    private authService: AuthService,
    private route: Router
  ) {
    this.loggedInUser = this.authService.user
  }

  ngOnInit() {

    this.contentId = this.router.snapshot.paramMap.get("id") || "";
    if (this.reviewId || this.isNewReview) {
      this.showMode = true;
      this.editMode = this.isNewReview;
      this.loadReviewData().then(() => {
        this.userService.findById(this.review.userId).then(async (user) => {
          if (!user) return
          this.userName = user.username;
          this.pfp = user.profilePicture;
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
          const user = await this.userService.findById(this.review.userId as string)
        }


      } else if (this.isNewReview) {
        console.log(this.review.userId)
        this.review = {
          id: '',
          title: '',
          description: '',
          score: 0,
          userId: (await this.loggedInUser.toPromise())?.id || "",
          content: this.contentId,
          likes: 0,
          dislikes: 0
        };

      }
      return Promise.resolve();
    } catch (error) {
      console.error('Error fetching review:', error);
      return Promise.reject(error);
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editMode = false;
    this.showMode = false;
  }
  editReview() {
    this.showModal = true;
    this.editMode = true;
    this.showMode = false;
    console.log('Edit review clicked:', this.review);
    this.editReviewClicked.emit(this.review);
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
        // @ts-ignore
        this.reviewService.editReview(this.review.id, this.review.title, this.review.description, this.review.score)
          .then(() => {

            console.log("edited", this.review);
            this.reviewUpdated.emit(this.review)
            this.showMode = true;
            this.editMode = false;
          });

      } else {
        await this.reviewService.createReview(this.review.userId, this.review.content, this.review.score, this.review.title, this.review.description);
      }

      this.newReview.emit(this.review.id)

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
      this.reviewService.deleteReview(this.review.id).then(() => {

        this.reviewDeleted.emit(this.review.id || "");
        console.log('Review deleted:', this.review.id);
      });
    } catch (error) {
      console.error(error);
    }
  }


}
