import { Component, Input, input } from '@angular/core';
import { ApiContentService } from '../../../services/api-content.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})

export class CabeceraComponent {
  
  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() img: string | undefined;

  ratingSelected: boolean = false;
  ratingOptions: number[] = [0, 1, 2, 3, 4, 5];

  otherSelected: boolean = false;
  addList: string[] = ['Completed', 'Pending', 'Not wanted'];

  selectedRating: string = "";
  selectedList: string = '';


  getRatings(): number[] {
    return this.ratingOptions
  }
  getLists(): string[] {
    return this.addList
  }

  // clics en los botones
  scrollValorar() {
      this.ratingSelected = !this.ratingSelected;
  }

  scrollListas() {
      this.otherSelected = !this.otherSelected;
  }

    
}
