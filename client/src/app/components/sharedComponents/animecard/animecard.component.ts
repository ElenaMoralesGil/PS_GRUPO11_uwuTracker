import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-animecard',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './animecard.component.html',
  styleUrl: './animecard.component.css',
})
export class AnimecardComponent {
  @Input() animeName: string | undefined;
  @Input() imageSource: string | undefined;
  @Input() animeId: string | undefined;

  //animeName = input('loading');
  //imageSource = input('/assets/images/shoujo-shuumatsu.jpeg');
  //animeId = input();
}
