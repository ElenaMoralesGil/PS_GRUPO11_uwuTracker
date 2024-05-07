import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, Input, Output, PlatformRef, ViewChild, input } from '@angular/core';
import { optionsBuilder } from "./optionsBuilder";
import { CommonModule, NgStyle, TitleCasePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

type optionNames = 'name' | 'genres' | 'year' | 'season' | 'format';
const seasons = [ 'winter', 'spring', 'summer', 'fall' ];

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, NgStyle, TitleCasePipe ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent implements AfterViewInit {

  /* Margin depending on what page why are in */
  page = input();

  /* Handling buttons for displaying or not dropwdown menus.*/
  optionsBuilder = new optionsBuilder();
  buttonsSelected = Array(4).fill(false);
  handleFilterClick = (option: number) => {
    this.buttonsSelected[ option ] = !this.buttonsSelected[ option ];
  }

  /* Declarations to handle emitted data from the search bar */
  name = new FormControl('');
  @Input() options: { name: string, genres: string[], year: string, season: string, format: string } = { name: '', genres: [], year: '', season: '', format: '' }
  @Output() optionsChange = new EventEmitter();

  // Function to get the current season of the year.
  getSeason = (d: Date) => Math.floor((d.getMonth() / 12 * 4)) % 4;

  /* Handler for data emmited from the search bar */
  emitOptions(item: optionNames, value: string | number) {
    switch (item) {
      case 'name':
        if (this.tracker !== true) this.modeHandler('normal');
        this.options[ item ] = this.options[ item ] === String(value) ? '' : String(value); break;
      case 'genres':
        if (this.tracker !== true) this.modeHandler('normal');
        this.options[ item ].includes(String(value)) ? this.options[ item ].splice(this.options[ item ].findIndex(elem => elem === value), 1) : this.options[ item ].push(String(value)); break;
      case 'year':
        if (this.tracker !== false) this.modeHandler('time');
        if (this.options[ item ] === value) { this.optionsCleanup([ "season" ]); this.options[ item ] = '' }
        else {
          this.options[ item ] = String(value);
          this.options.season = this.options.season === '' ? seasons[ this.getSeason(new Date()) ] : (this.isValidSeason(this.options.season) ? this.options.season : seasons[ this.getSeason(new Date()) ]);
        };
        break;
      case 'season':
        if (this.tracker !== false) this.modeHandler('time');
        if (this.options[ item ] === String(value)) { this.optionsCleanup([ "year" ]); this.options[ item ] = '' }
        else {
          this.options[ item ] = String(value);
          this.options.year = this.options.year === '' ? String(new Date().getFullYear()) : this.options.year;
        };
        break;
      case 'format':
        this.options[ item ] = this.options[ item ] === String(value) ? '' : String(value); break;
    }

    if (this.router.url == '/'){
      localStorage.setItem('options', JSON.stringify({...this.options}));
      this.router.navigate(['/search', 1]);
      return;
    }
    
    this.optionsChange.emit({ ...this.options });
  }

  optionsCleanup(items: optionNames[]) {
    items.forEach(elem => elem === "genres" ? this.options[ elem ].length = 0 : elem === "year" ? this.options[ elem ] = '' : this.options[ elem ] = '');
  }

  // Input Component to Observe
  @ViewChild('searchinput') searchInput!: ElementRef;
  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(debounceTime(1000)).subscribe(() => {
      this.emitOptions('name', String(this.name.value));
    })
  }

  // Variables to track the current search mode in wich we are in.
  searchMode = ''; tracker: boolean | undefined = undefined;

  modeHandler(mode: 'normal' | 'time') {
    if (mode === 'normal') {
      this.optionsCleanup([ "year", "season" ]); this.searchMode = "normal"; this.tracker = true;
    } else {
      this.optionsCleanup([ "name", "genres" ]); this.searchMode = "time"; this.name.reset(); this.tracker = false;
    }
  }

  isValidSeason(season: any) {
    if (this.options.year == String(new Date().getFullYear())) return seasons.indexOf(season) <= this.getSeason(new Date());
    else return true;
  }

  router: Router;
  document: Document;
  constructor(router:Router, @Inject(DOCUMENT) document:Document){
    this.router = router;
    this.document = document;
    this.detectScreenSize();
  }

  @HostListener("window:resize", [])
  public onResize() {
    this.detectScreenSize();
  }

  width:number = 0;
  detectScreenSize() {
    this.width = this.document.body.clientWidth;
    console.log(this.width);
  }

  filterButton = false;
  clickFilterButton() {
    this.filterButton = !this.filterButton;
  }

  showFilters() {
    if (this.width > 1200) return true;
    if (this.width < 560) return false;
    return this.filterButton;
  }
}