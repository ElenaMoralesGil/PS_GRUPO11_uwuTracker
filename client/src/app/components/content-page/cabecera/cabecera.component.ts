import {
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit
} from '@angular/core';
import { ApiContentService } from '../../../services/api-content.service';
import { UsersService } from "../../../services/users.service";
import { NgClass, NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgForOf
  ],
  styleUrls: [ './cabecera.component.css' ]
})
export class CabeceraComponent implements OnChanges {

  constructor(
    private cdr: ChangeDetectorRef,
    private contentService: ApiContentService,
    private userService: UsersService
  ) { }

  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() img: string | undefined;
  @Input() rating: number | undefined;
  @Input() id?: string;
  @Input() user?: string;
  @Input() likes?: number;

  @Output() likesChanged = new EventEmitter<number>();

  selectedRate: number | undefined;
  selectedList: string | null = null; // Store the selected list name
  ratingSelected: boolean = false;
  ratingOptions: number[] = [ 0, 1, 2, 3, 4, 5 ];
  listSelected: boolean = false;
  trackinglists: string[] = [ 'completed', 'planToWatch', 'dropped', 'watching' ];
  isInFavorites: boolean = false;


  ngOnChanges(changes: SimpleChanges): void {
    if ('user' in changes || 'id' in changes) {
      this.checkFavorites();
      this.setDefaultSelectedList();
    }
  }
  private async setDefaultSelectedList(): Promise<void> {
    try {
      if (this.user && this.id) {
        const listName = await this.userService.isOnList(this.user, this.id);
        console.log(listName);
        if (listName) {
          this.selectedList = listName;
        }
      }
    } catch (error) {
      console.error('Error checking list:', error);
    }
  }
  getRatings(): number[] {
    return this.ratingOptions;
  }

  isRatingSelected(option: number): boolean {
    return this.selectedRate === option;
  }

  ratingSelection(option: number): void {
    this.selectedRate = option;
    this.cdr.detectChanges();
  }

  isListSelected(option: string): boolean {

    return this.selectedList === option;
  }

  async listSelection(option: string): Promise<void> {

    if (option === this.selectedList) {

      this.selectedList = null;
    } else {
      this.selectedList = option;
    }
    if (this.user && this.id) {
      await this.userService.trackingList(this.user, this.id, option);
      this.cdr.detectChanges();
    }

  }

  scrollValorar(): void {
    if (this.user && this.id) {
      this.ratingSelected = !this.ratingSelected;
    } else {
      alert('You need to be logged in to rate an anime');
    }
  }

  scrollListas(): void {
    if (this.user && this.id) {
      this.listSelected = !this.listSelected;
    } else {
      alert('You need to be logged in to add animes to lists');
    }
  }

  async checkFavorites(): Promise<void> {
    if (this.user && this.id) {
      this.isInFavorites = await this.userService.checkOnList(this.user, this.id, "favorites");
    } else {
      this.isInFavorites = false;
    }
    this.cdr.detectChanges();
  }

  likeContent(): void {
    if (this.user) {
      this.contentService.like(this.user, this.id).then(likes => {
        this.likes = likes
        this.likesChanged.emit(likes);
        this.isInFavorites = !this.isInFavorites; // Toggle favorite status
      });
    } else {
      alert('You need to be logged in to give likes.');
    }
  }
}
