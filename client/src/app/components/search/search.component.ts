import { AfterViewChecked, ChangeDetectionStrategy, Component, DoCheck, Input, OnChanges, SimpleChanges, WritableSignal, effect, signal } from '@angular/core';
import { TagsComponent } from './tags/tags.component';
import { ResultsComponent } from './results/results.component';
import { SearchbarComponent } from '../sharedComponents/searchbar.component';
import { PaginationComponent } from '../sharedComponents/pagination.component';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [TagsComponent, ResultsComponent, SearchbarComponent, PaginationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  constructor(){
    effect(()=>{
      console.log(this.options());
    })
  }

  options:WritableSignal<{Name:string, Genres:string[], Year:number, Season:string, Format:string}> =
  signal({ 
    Name:'',
    Genres:[], 
    Year:0,
    Season:'', 
    Format:''
  });
}
