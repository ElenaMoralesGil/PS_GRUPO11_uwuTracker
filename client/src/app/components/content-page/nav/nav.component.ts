import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { ApiContentService } from '../../../services/api-content.service';
import { ReviewService } from '../../../services/review.service';
import { ContentComponent } from '../../content/content.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ContentComponent, NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  isContentVisible: boolean = false;


}
