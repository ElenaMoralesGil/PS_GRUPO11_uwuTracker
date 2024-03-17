import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { SarchbarComponent} from '../sharedComponents/sarchbar/sarchbar.component'
import { AnimelistComponent } from './animelist/animelist.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, SarchbarComponent, AnimelistComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  rowNumbers = [1, 2, 3];
}
