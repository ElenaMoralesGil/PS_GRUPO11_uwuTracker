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

  infoTitle = [
    `Likes`,
    `Type`,
    `Source`,
    `Episodes`,
    `Duration`,
    `Status`,
    `Season`,
    `Year`,
    `Studios`,
    `Genres`,
    `Rating`,

  ]
}
