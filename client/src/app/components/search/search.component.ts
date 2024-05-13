import { AfterViewChecked, ChangeDetectionStrategy, Component, DoCheck, Inject, Input, OnChanges, PLATFORM_ID, SimpleChanges, WritableSignal, effect, signal } from '@angular/core';
import { SearchbarComponent } from '../sharedComponents/searchbar/searchbar.component';
import { TagsComponent } from './tags/tags.component';
import { ResultsComponent } from './results/results.component';
import { PaginationComponent } from '../sharedComponents/pagination/pagination.component';
import { ApiContentService } from '../../services/api-content.service';
import { ActivatedRoute, Router } from '@angular/router';
import Content from '../../schemas/Content.schema';
import { isPlatformBrowser } from '@angular/common';
import { noop } from 'rxjs';



@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ SearchbarComponent, TagsComponent, ResultsComponent, PaginationComponent ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  // Variables to control current and maximum number of pages;
  current_page: WritableSignal<number>;
  max_pages: number | undefined = undefined;
  isCurrentValid: number = 0;
  // Conteins the contents of every query to the API.
  contents: Content[] = [];

  // Search parameters
  options: WritableSignal<{ name: string, genres: string[], year: string, season: string, format: string }> =
    signal({
      name: '',
      genres: [],
      year: '',
      season: '',
      format: ''
    });

  constructor(contentService: ApiContentService, route: ActivatedRoute, router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    // Subscribing to current_page
    this.current_page = signal(Number(route.snapshot.paramMap.get('page')));
    route.params.subscribe(params => this.current_page.set(params[ 'page' ]));
    if (isPlatformBrowser(this.platformId)){
      route.url.subscribe(() =>{
        this.options.set(localStorage.getItem('options') ? JSON.parse(<string>localStorage.getItem('options')) : this.options());
        localStorage.clear();
      });
    }
    // When search parameters change this function gets called
    effect(async () => {
      if (this.current_page() === this.isCurrentValid) { this.current_page.set(1); router.navigate([ '../', 1 ], { relativeTo: route }) };
      contentService.search({ ...this.options(), page: this.current_page() }).then(contents => {
        if (Array.isArray(contents)) { this.contents = []; return }
        // Assigning content array
        this.contents = contents.data;
        // Assigning last visible page;
        this.max_pages = contents.pagination.last_visible_page;
        // Setting current page as valid
        this.isCurrentValid = this.current_page();
      });
    }, { allowSignalWrites: true })
  }
}

