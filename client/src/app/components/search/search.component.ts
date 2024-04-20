import { AfterViewChecked, ChangeDetectionStrategy, Component, DoCheck, Input, OnChanges, SimpleChanges, WritableSignal, effect, signal } from '@angular/core';
import { SearchbarComponent } from '../sharedComponents/searchbar/searchbar.component';
import { TagsComponent } from './tags/tags.component';
import { ResultsComponent } from './results/results.component';
import { PaginationComponent } from '../sharedComponents/pagination/pagination.component';
import { ApiContentService } from '../../services/api-content.service';



@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchbarComponent, TagsComponent, ResultsComponent, PaginationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  constructor(contentService:ApiContentService){
    effect(()=>{
      contentService.search({...this.options(), page:this.current_page ? this.current_page : 1}).then(contents => console.log(contents))
    })
  }
  current_page = undefined;
  options:WritableSignal<{name:string, genres:string[], year:number, season:string, format:string}> =
  signal({ 
    name:'',
    genres:[], 
    year:2024,
    season:'spring', 
    format:''
  });
}
