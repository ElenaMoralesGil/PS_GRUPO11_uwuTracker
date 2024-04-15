import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Router } from 'express';
import { ApiContentService } from '../../../services/api-content.service';
import { ReviewService } from '../../../services/review.service';
import { ContentComponent } from '../../content/content.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { CharactersComponent } from '../characters/characters.component';
import { EpisodesComponent } from '../episodes/episodes.component';
import { CommentsComponent } from '../../comments/comments.component';
import { ReviewComponent } from '../../review/review.component';
import { ContentPageComponent } from '../content-page.component';
import { StaffComponent } from '../staff/staff.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ContentComponent, NgIf, NgClass, NgFor, RouterLink, RouterOutlet, CharactersComponent, EpisodesComponent, CommentsComponent, ReviewComponent, StaffComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  showCharacters: boolean = false;
  showEpisodes: boolean = false;
  showComments: boolean = false;
  showReviews: boolean = false;

  start: boolean = true; 
  selectedIndex: number = -1;
  activarCss: boolean = false;

  constructor(private content: ContentPageComponent){}
  protected id?: string = this.content.getId()


  informationNav: string[] = [
    'Characters',
    'Episodes',
    'Staff',
    'Comments',
    'Reviews'
  ];

  showHide(index: number){
    this.selectedIndex = index;
    

  }


}
