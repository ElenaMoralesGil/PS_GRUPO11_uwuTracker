import { Component, OnInit } from '@angular/core';
import { ApiContentService } from '../../services/api-content.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ReviewComponent} from "../review/review.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    ReviewComponent,
    NgIf
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {

  protected id?: string
  protected title?: string
  showReviewComponent: boolean = false;
  constructor(private Contents: ApiContentService, private router: ActivatedRoute,private rout: Router) { }

  async ngOnInit() {
    let content
    try { content = await this.Contents.findById(this.router.snapshot.paramMap.get("id") || "") }
    catch { return this.id = 'not-found' }

    if (!content?.id) return this.id = 'not found'

    this.id = content.id
    this.title = content.title

    return
  }

  openReviewCreation(): void {
    console.log('Navigating to create review...');
    console.log('Content ID:', this.id);
    // Navigate to the review creation route, passing content ID as a parameter
    this.rout.navigate(['content', this.id, 'review', 'create']);
    // Set the flag to display the review component
    this.showReviewComponent = true;
  }
}
