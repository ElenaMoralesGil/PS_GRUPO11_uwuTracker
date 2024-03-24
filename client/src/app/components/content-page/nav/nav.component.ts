import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { ApiContentService } from '../../../services/api-content.service';
import { ReviewService } from '../../../services/review.service';
import { ContentComponent } from '../../content/content.component';
import { NgFor, NgIf } from '@angular/common';
import { CharactersComponent } from '../characters/characters.component';
import { EpisodesComponent } from '../episodes/episodes.component';
import { CommentsComponent } from '../../comments/comments.component';
import { ReviewComponent } from '../../review/review.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ContentComponent, NgIf, NgFor, CharactersComponent, EpisodesComponent, CommentsComponent, ReviewComponent],
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



  informationNav: string[] = [
    'Characters',
    'Episodes',
    'Comments',
    'Reviews'
  ];

  showHide(index: number){
    this.selectedIndex = index;
    if (index === 0) {
      if(this.showCharacters){
        this.showCharacters = false;
      }else{
        this.showCharacters = true;
        this.showEpisodes = false;
        this.showComments = false;
        this.showReviews = false;
        this.start = false;
      }
    }else if (index === 1) {
      if(this.showEpisodes){
        this.showEpisodes = false;
      }else{
        this.showEpisodes = true;
        this.showCharacters = false;
        this.showComments = false;
        this.showReviews = false;
        this.start = false;
      }
    }else if (index === 2) {
      if(this.showComments){
        this.showComments = false;
      }else{
        this.showComments = true;
        this.showCharacters = false;
        this.showEpisodes = false;
        this.showReviews = false;
        this.start = false;
      }
    }else if (index === 3) {
      if(this.showReviews){
        this.showReviews = false;
      }else{
        this.showReviews = true;
        this.showCharacters = false;
        this.showEpisodes = false;
        this.showComments = false;
        this.start = false;
      }
    }

  }


}
