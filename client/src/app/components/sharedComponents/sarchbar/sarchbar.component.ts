import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { optionsBuilder } from "./optionsBuilder";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sarchbar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sarchbar.component.html',
  styleUrl: './sarchbar.component.css'
})
export class SarchbarComponent {
  optionsBuilder = new optionsBuilder();
  buttonsSelected = Array(4).fill(false);
  currentPage = input();

  handleFilterClick = (option:number) => {
    this.buttonsSelected[option] = !this.buttonsSelected[option];
  }
}
