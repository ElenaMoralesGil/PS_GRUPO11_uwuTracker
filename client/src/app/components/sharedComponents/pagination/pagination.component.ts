import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [RouterLink, NgStyle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() numberOfPages:number|undefined = undefined;
  @Input() currentPage:number|undefined = undefined;
}
