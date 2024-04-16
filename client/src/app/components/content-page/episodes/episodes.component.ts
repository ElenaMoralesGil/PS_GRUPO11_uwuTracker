import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [NgFor],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent {
  @Input() number: string | undefined;
  @Input() name: string | undefined;
  @Input() duration: string | undefined;
  @Input() aired: string | undefined;

  
  episodes2 = [
    { number: '1', name: 'Episode 1', duration: '30 minutes', aired: 'January 1, 2022' },
    { number: '2', name: 'Episode 2', duration: '25 minutes', aired: 'January 8, 2022' },
    { number: '3', name: 'Episode 3', duration: '43 minutes', aired: 'January 20, 2022' },
    { number: '4', name: 'Episode 4', duration: '36 minutes', aired: 'January 26, 2022' },
    { number: '1', name: 'Episode 1', duration: '30 minutes', aired: 'January 1, 2022' },
    { number: '2', name: 'Episode 2', duration: '25 minutes', aired: 'January 8, 2022' },
    { number: '3', name: 'Episode 3', duration: '43 minutes', aired: 'January 20, 2022' },
    { number: '4', name: 'Episode 4', duration: '36 minutes', aired: 'January 26, 2022' },
    { number: '1', name: 'Episode 1', duration: '30 minutes', aired: 'January 1, 2022' },
    { number: '2', name: 'Episode 2', duration: '25 minutes', aired: 'January 8, 2022' },
    { number: '3', name: 'Episode 3', duration: '43 minutes', aired: 'January 20, 2022' },
    { number: '4', name: 'Episode 4', duration: '36 minutes', aired: 'January 26, 2022' },
    { number: '1', name: 'Episode 1', duration: '30 minutes', aired: 'January 1, 2022' },
    { number: '2', name: 'Episode 2', duration: '25 minutes', aired: 'January 8, 2022' },
    { number: '3', name: 'Episode 3', duration: '43 minutes', aired: 'January 20, 2022' },
    { number: '4', name: 'Episode 4', duration: '36 minutes', aired: 'January 26, 2022' },
    { number: '1', name: 'Episode 1', duration: '30 minutes', aired: 'January 1, 2022' },
    { number: '2', name: 'Episode 2', duration: '25 minutes', aired: 'January 8, 2022' },
    { number: '3', name: 'Episode 3', duration: '43 minutes', aired: 'January 20, 2022' },
    { number: '4', name: 'Episode 4', duration: '36 minutes', aired: 'January 26, 2022' },
    { number: '1', name: 'Episode 1', duration: '30 minutes', aired: 'January 1, 2022' },
    { number: '2', name: 'Episode 2', duration: '25 minutes', aired: 'January 8, 2022' },
    { number: '3', name: 'Episode 3', duration: '43 minutes', aired: 'January 20, 2022' },
    { number: '4', name: 'Episode 4', duration: '36 minutes', aired: 'January 26, 2022' },
    { number: '1', name: 'Episode 1', duration: '30 minutes', aired: 'January 1, 2022' },
    { number: '2', name: 'Episode 2', duration: '25 minutes', aired: 'January 8, 2022' },
    { number: '3', name: 'Episode 3', duration: '43 minutes', aired: 'January 20, 2022' },
    { number: '4', name: 'Episode 4', duration: '36 minutes', aired: 'January 26, 2022' },
    { number: '1', name: 'Episode 1', duration: '30 minutes', aired: 'January 1, 2022' },
    { number: '2', name: 'Episode 2', duration: '25 minutes', aired: 'January 8, 2022' },
    { number: '3', name: 'Episode 3', duration: '43 minutes', aired: 'January 20, 2022' },
    { number: '4', name: 'Episode 4', duration: '36 minutes', aired: 'January 26, 2022' },

  ];

  constructor() { }
}
