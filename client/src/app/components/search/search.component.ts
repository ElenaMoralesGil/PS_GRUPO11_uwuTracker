import { AfterViewChecked, ChangeDetectionStrategy, Component, DoCheck, Input, OnChanges, SimpleChanges, WritableSignal, effect, signal } from '@angular/core';
import { SearchbarComponent } from '../sharedComponents/searchbar/searchbar.component';
import { TagsComponent } from './tags/tags.component';
import { ResultsComponent } from './results/results.component';
import { PaginationComponent } from '../sharedComponents/pagination/pagination.component';



@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ SearchbarComponent, TagsComponent, ResultsComponent, PaginationComponent ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnChanges {
  constructor() {
    // effect(() => {
    //   console.log(this.options);
    // })
  }
  ngOnChanges(): void {
    console.log(this.options)
  }



  options: { Name: string, Genres: string[], Year: number, Season: string, Format: string } = {
    Name: '',
    Genres: [],
    Year: 0,
    Season: '',
    Format: ''
  };
}
