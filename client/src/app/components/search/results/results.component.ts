import { Component, Input, OnChanges, SimpleChanges, effect } from '@angular/core';
import { AnimecardComponent } from '../../sharedComponents/animecard/animecard.component';
import Content from '../../../schemas/Content.schema';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [AnimecardComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  // Contents to represent input
  @Input() contents:Content[] = [];
  
}
