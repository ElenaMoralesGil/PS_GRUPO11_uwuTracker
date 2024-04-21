import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { AnimecardComponent } from '../../sharedComponents/animecard/animecard.component';
import { NgFor, NgIf } from '@angular/common';
import { ListAimesComponent } from '../../sharedComponents/list-animes/list-aimes.component';
import { ApiContentService } from '../../../services/api-content.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-animelist',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnimecardComponent, NgFor, NgIf, ListAimesComponent],
  templateUrl: './animelist.component.html',
  styleUrl: './animelist.component.css'
})
export class AnimelistComponent {
  //descriptor = input("Anime Row");
  descriptor = ["Animes Populares", "Animes temporada actual", "Recomendaciones aleatorias"];
  @Input() animeType: string | undefined;

  name: string = "";
  img: string = "";
  recommendations: any;
  recu: string [] = [];


  constructor(private apiService: ApiContentService, private router: ActivatedRoute) { }


  async ngOnInit() {
    
    // carga de los recomendaciones aleatorios
    try {
      this.recommendations = await this.apiService.getRecommendations();

      console.log('Recomendaciones:', this.recommendations);
      
      
    } catch (error) {
      console.error('Error al cargar las recomendaciones:', error);
    }
   
    return
  }
}
