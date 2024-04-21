import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { AnimecardComponent } from '../../sharedComponents/animecard/animecard.component';
import { NgFor } from '@angular/common';
import { ListAimesComponent } from '../../sharedComponents/list-animes/list-aimes.component';
import { ApiContentService } from '../../../services/api-content.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-animelist',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnimecardComponent, NgFor, ListAimesComponent],
  templateUrl: './animelist.component.html',
  styleUrl: './animelist.component.css'
})
export class AnimelistComponent {
  //descriptor = input("Anime Row");
  descriptor = ["Animes Populares", "Animes temporada actual", "Recomendaciones aleatorias"];
  @Input() animeType: string | undefined;

  name: string = "";
  img: string = "";

  constructor(private apiService: ApiContentService, private router: ActivatedRoute) { }


  async ngOnInit() {
    switch (this.animeType) {
      case 'Animes Populares':
        // carga de los animes populares
        
        break;
      case 'Animes temporada actual':
        // carga de los animes de la temporada actual
        break;
      case 'Recomendaciones aleatorias':
        // carga de los animes aleatorios
        try {
          const recommendations = (await this.apiService.getRecommendations());
          //this.name = recommendations
          console.log('Recomendaciones:', recommendations);
        } catch (error) {
          console.error('Error al cargar las recomendaciones:', error);
        }
        break;
      default:
        console.error('Tipo de anime no válido:', this.animeType);
    }
    return
  }
}
