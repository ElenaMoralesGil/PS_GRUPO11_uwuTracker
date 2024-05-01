import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Review from "../../../../schemas/Review.schema";
import { ReviewService } from '../../../../services/review.service';
import { AuthService } from "../../../../services/auth.service";
import { FormsModule } from "@angular/forms";
import { AsyncPipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { UsersService } from '../../../../services/users.service';
import User from '../../../../schemas/User.schema';
import { Observable } from 'rxjs';;
import { Router } from "@angular/router"
import { ApiContentService } from "../../../../services/api-content.service";
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
  @Output() reviewModalClosed: EventEmitter<any> = new EventEmitter();
  editMode: boolean = false;
  showMode: boolean = true;
  showModal: boolean = false;

  userName?: string;
  pfp?: string;
  contentId: string = "";
  loggedInUser: Observable<User | null>
  liked: boolean = false;
  disliked: boolean = false;
  contentScore?: number = 0;
  loggedUserId?: String;

  constructor(
    private reviewService: ReviewService,
    private userService: UsersService,
    private contentService: ApiContentService,
    private router: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.loggedInUser = this.authService.user
  }



  ngOnInit() {

    const parentRoute = this.router.parent;
    if (parentRoute) {

      parentRoute.params.subscribe(params => {
        this.contentId = params[ 'id' ];

      });
    }

    this.authService.user.subscribe((user: User | null) => {
      this.loggedUserId = user?.id;
    });
    if (this.reviewId || this.isNewReview) {
      this.showMode = true;
      this.editMode = this.isNewReview;
      this.loadReviewData().then(async () => {

        if (this.loggedUserId) {
          this.checkIfLiked();
          this.checkIfDisLiked();
        }
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

        const user = await this.userService.findById(<string>this.loggedUserId);
        if (user && user.userScores && this.contentId in user.userScores) {
          // @ts-ignore
          const contentScore = user.userScores[ this.contentId ] || 0;
          this.contentScore = contentScore;
        } else {
          this.contentScore = 0;
        }

        this.showMode = false;
        this.showModal = true;
        this.editMode = true

        this.review = {
          id: '',
          title: '',
          description: '',
          score: <number>this.contentScore,
          userId: <string>this.loggedUserId,
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
  closeModal() {
    this.showModal = false;
    this.editMode = false;
    this.showMode = true;
    this.reviewModalClosed.emit(true);
  }
  editReview() {
    this.showModal = true;
    this.editMode = true;
    this.showMode = false;
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
      if (this.review.score < 0 || this.review.score > 5 || !this.review.title || !this.review.description) {
        throw new Error('Review is not complete');
      }
      if (this.review.id) {
        // @ts-ignore
        this.reviewService.editReview(this.review.id, this.review.title, this.review.description, this.review.score)
          .then(async () => {
            await this.contentService.setScore(this.contentId, this.review.score, <string>this.loggedUserId);
            this.reviewUpdated.emit(this.review)
            this.closeModal()
            console.log("showModal", this.showModal);
            console.log("showMode", this.showMode);
            console.log("showEdit", this.editMode);

          });
      } else {
        // @ts-ignore
        await this.reviewService.
        createReview(this.review.userId, this.review.content, this.review.score, this.review.title, this.review.description)
          .then(async r => {
            await this.contentService.setScore(this.contentId, this.review.score, <string>this.loggedUserId);
            this.newReview.emit(r)
            this.closeModal()

          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async likeReview() {

    if (this.loggedUserId !== undefined) {

      this.reviewService.likeReview(<string>this.loggedUserId, <string>this.review.id)
        .then(([ likes, dislikes ]) => {
          this.review.likes = likes;
          this.review.dislikes = dislikes;
          this.reviewUpdated.emit(this.review);
          this.liked = !this.liked;
          if (this.disliked && this.liked) {
            this.disliked = false;
          }
        })
        .catch(error => {
          console.error('Error disliking review:', error);
        });
    } else {
      alert("You are not logged in!");
    }
  }

  async checkIfLiked() {
    if (this.loggedUserId !== undefined) {
      this.liked = await this.reviewService.checkIfLiked(<string>this.loggedUserId, <string>this.review.id);
    }

  }
  async checkIfDisLiked() {

    if (this.loggedUserId !== undefined) {
      this.disliked = await this.reviewService.checkIfDisliked(<string>this.loggedUserId, <string>this.review.id);

    }
  }
  async dislikeReview() {

    if (this.loggedUserId !== undefined) {

      this.reviewService.dislikeReview(<string>this.loggedUserId, <string>this.review.id)
        .then(([ likes, dislikes ]) => {
          this.review.likes = likes;
          this.review.dislikes = dislikes;
          this.reviewUpdated.emit(this.review);
          this.disliked = !this.disliked;
          if (this.liked && this.disliked) {
            this.liked = false;
          }
        })
        .catch(error => {
          console.error('Error disliking review:', error);
        });
    } else {
      alert("You are not logged in!");
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
