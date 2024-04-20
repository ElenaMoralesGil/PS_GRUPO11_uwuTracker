import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';



@Component({
  selector: 'app-aside-information',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule
  ],
  templateUrl: './aside-information.component.html',
  styleUrl: './aside-information.component.css'
})
export class AsideInformationComponent {
  @Input() information: {
    likes: number, source: string, year: string; type: string; episodesNumber: string; season: string;
    duration: string; status: string; studios: string; genres: string; rating: string;
  }[] = [];

  //points = ['likes', 'duration', 'year', 'type', 'status', 'season', 'genres', 'source', 'studios', 'episodesNumber', 'rating']; 

  infoTitle = [
    `likes`,
    `type`,
    `source`,
    `episodes`,
    `duration`,
    `status`,
    `season`,
    `year`,
    `studios`,
    `genres`,
    `rating`,

  ]

  shouldShow(item2: any, item1: string, index: number): boolean {
    if (!item2) return false; // Verificar si item2 está definido
    switch (index) {
        case 0: return !this.isUndefined(item2.likes);
        case 1: return !this.isUndefined(item2.type);
        case 2: return !this.isUndefined(item2.source);
        case 3: return !this.isUndefined(item2.episodesNumber);
        case 4: return !this.isUndefined(item2.duration);
        case 5: return !this.isUndefined(item2.status);
        case 6: return !this.isUndefined(item2.season);
        case 7: return !this.isUndefined(item2.year);
        case 8: return !this.isUndefined(item2.studios);
        case 9: return !this.isUndefined(item2.genres);
        case 10: return !this.isUndefined(item2.rating);
        default: return false;
    }
}

getValue(item2: any, item1: string): string {
    return item2[item1];
}
  

  isUndefined(item: any): boolean {
    if(item === 'undefined'){
      return true;
    }else{
      return false
    }
  }
}
