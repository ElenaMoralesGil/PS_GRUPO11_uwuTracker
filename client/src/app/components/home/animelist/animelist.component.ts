import { AfterContentInit, AfterRenderPhase, AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, input } from '@angular/core';
import { AnimecardComponent } from '../../sharedComponents/animecard/animecard.component';
import { NgFor, NgIf } from '@angular/common';
import { ListAimesComponent } from '../../sharedComponents/list-animes/list-aimes.component';
import { ApiContentService } from '../../../services/api-content.service';
import { ActivatedRoute } from '@angular/router';
import Content from '../../../schemas/Content.schema';

@Component({
  selector: 'app-animelist',
  standalone: true,
  imports: [ AnimecardComponent, NgFor, NgIf, ListAimesComponent ],
  templateUrl: './animelist.component.html',
  styleUrl: './animelist.component.css'
})
export class AnimelistComponent {
  //descriptor = input("Anime Row");
  descriptor = [ "Animes Populares", "Animes temporada actual", "Recomendaciones aleatorias" ];
  @Input() animeType: string | undefined;

  name: string = "";
  img: string = "";
  recommendations: any;
  popular: Content[] = []
  currentSeason: Content[] = []
  recu: string[] = [];


  getSeason = (d: Date) => {
    const seasons = [ 'winter', 'spring', 'summer', 'fall' ]
    return seasons[ Math.floor((d.getMonth() / 12 * 4)) % 4 ]
  }



  constructor(private apiService: ApiContentService, private router: ActivatedRoute) {


    // carga de los recomendaciones aleatorios

    this.apiService.getRecommendations().then((recommendations) => { this.recommendations = recommendations })


    this.apiService.search({ season: this.getSeason(new Date()), year: String(new Date().getFullYear()) })
      .then(obj => { this.currentSeason = obj.data })


    this.apiService.find({}, { orderBy: 'likes', orderByDir: 'desc', limit: 21, startAt: 52991 })
      .then(obj => { this.popular = obj.slice(1) })

    return
  }
}
