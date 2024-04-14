import {OnChanges, SimpleChanges, ChangeDetectorRef, Component, EventEmitter, Input, input, OnInit, Output} from '@angular/core';
import { ApiContentService } from '../../../services/api-content.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {UsersService} from "../../../services/users.service";

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [NgFor, CommonModule, NgIf],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})

export class CabeceraComponent  implements OnChanges {

  constructor(
    private cdr: ChangeDetectorRef,
    private ContentService:  ApiContentService,
    private UserService:  UsersService
  ) { }

  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() img: string | undefined;
  @Input() rating: number | undefined;
  @Input() id?:string;
  @Input() user?:string;
  @Input() likes?: number;

  @Output() likesChanged = new EventEmitter<number>();

  selectedRate: number | undefined;
  selectedList: string | undefined;
  ratingSelected: boolean = false;
  ratingOptions: number[] = [0, 1, 2, 3, 4, 5];
  listSelected: boolean = false;
  trackinglists: string[] = ['completed', 'planToWatch', 'dropped', 'watching'];
  isInFavorites: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if ('user' in changes || 'id' in changes) {
      this.checkFavorites();
    }
  }

  getRatings(): number[] {
    return this.ratingOptions
  }


  isRatingSelected(option: number): boolean {
    return this.selectedRate === option;
  }
  ratingSelection(option: number) {
    this.selectedRate = option;
    this.cdr.detectChanges();
  }

  isListSelected(option: string): boolean {
    return this.selectedList === option;
  }
  listSelection(option: string) {
    this.selectedList = option;
    if (this.user && this.id) {
      this.UserService.trackingList(this.user, this.id, option).then();
    }
    this.cdr.detectChanges();
  }

  scrollValorar() {
      this.ratingSelected = !this.ratingSelected;
  }

  scrollListas() {
      this.listSelected = !this.listSelected;
  }

  async checkFavorites() {
    if (this.user && this.id) {
      this.isInFavorites = await this.UserService.checkOnList(this.user, this.id, "favorites");
    } else {
      this.isInFavorites = false;
    }
    this.cdr.detectChanges();
  }

  likeContent() {
    if (this.user) {
      this.ContentService.like(this.user, this.id).then(likes => {
        this.likes = likes;
        this.likesChanged.emit(likes);
        this.isInFavorites = !this.isInFavorites; // Toggle favorite status
      });
    } else {
      alert('You need to be logged in to give likes.');
    }
  }
}
