import { Component } from '@angular/core';
import { ApiContentService } from '../../../services/api-content.service';
import { ActivatedRoute } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  episodes = [
    { number: '1', name: 'Episode 1', duration: '30 minutes', aired: 'January 1, 2022' },
    { number: '2', name: 'Episode 2', duration: '25 minutes', aired: 'January 8, 2022' },
    { number: '3', name: 'Episode 3', duration: '43 minutes', aired: 'January 20, 2022' },
    { number: '4', name: 'Episode 4', duration: '36 minutes', aired: 'January 26, 2022' },

  ];

  constructor() { }
 
}
