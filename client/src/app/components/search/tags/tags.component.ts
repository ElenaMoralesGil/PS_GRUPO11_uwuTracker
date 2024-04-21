import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

type optionNames = 'name' | 'genres' | 'year' | 'season' | 'format';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {

  @Input() options = {
    name: '',
    genres: [ '' ],
    year: '',
    season: '',
    format: ''
  }
  @Output() optionsChange = new EventEmitter();

  changedOptions(key: optionNames, value: string | number) {
    switch (key) {
      case 'genres':
        this.options[ key ].splice(this.options[ key ].findIndex(elem => elem === value), 1); break;
      case 'year':
        this.options.season = ''; this.options[ key ] = ''; break;
      case 'season':
        this.options.year = ''; this.options[ key ] = ''; break;
      default:
        this.options[ key ] = '';
    }
    this.optionsChange.emit({ ...this.options });
  }
}
