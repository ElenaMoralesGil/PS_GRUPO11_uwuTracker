// content.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiContentService } from '../../services/api-content.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ReviewComponent} from "../review/review.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  standalone: true,
  imports: [
    ReviewComponent,
    NgIf
  ],
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  protected id?: string;
  protected title?: string;
  protected reviews?: string[];
  isReviewCreationOpen: boolean = false; // Initialize to false

  constructor(private contents: ApiContentService, private router: ActivatedRoute, private rout: Router) { }

  async ngOnInit() {
    try {
      const content = await this.contents.findById(this.router.snapshot.paramMap.get("id") || "");
      if (!content?.id) {
        this.id = 'not-found';
        return;
      }

      this.id = content.id;
      this.title = content.title;

      // Extract review IDs from the content object
      if (content.reviews) {
        this.reviews = content.reviews;
        console.log('Review IDs:', this.reviews);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  }

  toggleReviewCreation(): void {
    // Toggle the boolean value to show/hide review creation
    this.isReviewCreationOpen = !this.isReviewCreationOpen;
  }

  openReviewCreation(): void {
    console.log('Navigating to create review...');
    console.log('Content ID:', this.id);
    // Navigate to the review creation route, passing content ID as a parameter
    this.rout.navigate(['content', this.id, 'review', 'create']);
  }

  async showReviews() {
    console.log('Navigating to reviews...');
    this.rout.navigate(['content', this.id, 'reviews']);
  }
}
