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
  @Input() information: { likes:number,   year: string; type: string; episodesNumber: string; season: string; }[] = [];

    infoTitle = [
      'Likes',
      `Year`,
      `Type`,
      `Episodes Number`,
      'Season'
    ]
}
