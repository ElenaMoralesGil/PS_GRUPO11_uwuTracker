import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AnimecardComponent } from '../animecard/animecard.component';
import { ApiContentService } from '../../../services/api-content.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-list-aimes',
  standalone: true,
  imports: [CommonModule, AnimecardComponent],
  templateUrl: './list-aimes.component.html',
  styleUrl: './list-aimes.component.css'
})
export class ListAimesComponent {
  @Input() animeType: string | undefined;
  animeList: { name: string, imageUrl: string }[] = [];
  protected id?: string
  protected name?: string
  protected img?: string



  constructor(private apiService: ApiContentService, private router: ActivatedRoute) { }


  async ngOnInit() {
    switch (this.animeType) {
      case 'Animes Populares':
        // carga de los animes populares
        /*const popularAnimeIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // Lista de IDs de animes populares
        for (const id of popularAnimeIds) {
          try {
            const content = await this.apiService.findById(id.toString()); // Solicita información de cada anime por su ID
            if (content) {
              this.animeList.push({ name: content.title, imageUrl: content.coverImg }); // Almacena el nombre e imagen del anime en la lista
            }
          } catch (error) {
            console.error('Error al cargar anime con ID:', id, error);
          }
        }*/
        break;
      case 'Animes temporada actual':
        // carga de los animes de la temporada actual
        break;
      case 'Recomendaciones aleatorias':
        // carga de los animes aleatorios
        break;
      default:
        console.error('Tipo de anime no válido:', this.animeType);
    }
    return
  }

}
