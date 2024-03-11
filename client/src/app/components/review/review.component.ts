import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { ActivatedRoute } from '@angular/router';
import {ApiContentService} from "../../services/api-content.service";

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {

  protected id?: string
  protected title?: string

  async ngOnInit() {
    let review
    try { review = await this.Reviews.findById(this.router.snapshot.paramMap.get("id") || "") }
    catch { return this.id = 'not-found' }

    if (!review?.id) return this.id = 'not found'

    this.id = review.id
    this.title = review.title

    return
  }
  constructor(private Reviews: ReviewService, private router: ActivatedRoute) { }
}
