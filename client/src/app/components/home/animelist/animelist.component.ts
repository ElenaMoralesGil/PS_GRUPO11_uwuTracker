import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AnimecardComponent } from '../../sharedComponents/animecard/animecard.component';
import { NgFor } from '@angular/common';
import { ListAimesComponent } from '../../sharedComponents/list-animes/list-aimes.component';

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
}
