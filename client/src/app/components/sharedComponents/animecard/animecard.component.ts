import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-animecard',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './animecard.component.html',
  styleUrl: './animecard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimecardComponent {
  animeName = input('loading');
  imageSource = input('/assets/images/shoujo-shuumatsu.jpeg');
  animeId = input();
}
