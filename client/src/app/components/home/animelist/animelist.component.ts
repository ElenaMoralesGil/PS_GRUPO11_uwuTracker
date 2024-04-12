import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AnimecardComponent } from '../../sharedComponents/animecard/animecard.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-animelist',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnimecardComponent, NgFor],
  templateUrl: './animelist.component.html',
  styleUrl: './animelist.component.css'
})
export class AnimelistComponent {
  //descriptor = input("Anime Row");
  descriptor = ["Animes Populares", "Animes temporada actual", "Recomendaciones aleatorias"];

}
