import { ChangeDetectorRef, Component, Input, input } from '@angular/core';
import { ApiContentService } from '../../../services/api-content.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [NgFor, CommonModule, NgIf],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})

export class CabeceraComponent {

  constructor(
    private cdr: ChangeDetectorRef,
    private ContentService:  ApiContentService
  ) { }

  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() img: string | undefined;
  @Input() rating: number | undefined;
  @Input() id?:string;
  @Input() user?:string;
  @Input() likes?: number;


  selectedRate: number | undefined;
  selectedList: string | undefined;



  ratingSelected: boolean = false;
  ratingOptions: number[] = [0, 1, 2, 3, 4, 5];

  listSelected: boolean = false;
  addList: string[] = ['Completed', 'Pending', 'Not wanted'];

  getRatings(): number[] {
    return this.ratingOptions
  }
  getLists(): string[] {
    return this.addList
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
    this.cdr.detectChanges();
  }

  // clics en los botones
  scrollValorar() {
      this.ratingSelected = !this.ratingSelected;
  }

  scrollListas() {
      this.listSelected = !this.listSelected;
  }


  likeContent() {
    if (this.user) {
      this.ContentService.addLike(this.user, this.id).then();
    } else {
      alert('You need to be logged in to give likes.');
    }
  }
}
