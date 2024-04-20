import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ContentPageComponent } from '../content-page.component';
import { ApiContentService } from '../../../services/api-content.service';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [NgFor],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent {
  @Input() episodes: any[] | undefined;
  @Input() number: string | undefined;
  @Input() name: string | undefined;
  @Input() duration: string | undefined;
  @Input() aired: string | undefined;

  constructor(private content: ContentPageComponent, private apiService: ApiContentService){}

  ngOnInit() {
    const id = this.content.getId();
    if (id) {
      this.apiService.getEpisodes(id).then(episodes => {
        this.episodes = episodes;
      });

    }
  }












  episodes2 = [
    { number: '1', name: 'Episode 1', duration: '30 minutes', aired: 'January 1, 2022' },
    { number: '2', name: 'Episode 2', duration: '25 minutes', aired: 'January 8, 2022' },
    { number: '3', name: 'Episode 3', duration: '43 minutes', aired: 'January 20, 2022' },
    { number: '4', name: 'Episode 4', duration: '36 minutes', aired: 'January 26, 2022' },
    { number: '1', name: 'Episode 1', duration: '30 minutes', aired: 'January 1, 2022' },
    { number: '2', name: 'Episode 2', duration: '25 minutes', aired: 'January 8, 2022' },
    { number: '3', name: 'Episode 3', duration: '43 minutes', aired: 'January 20, 2022' },
    { number: '4', name: 'Episode 4', duration: '36 minutes', aired: 'January 26, 2022' },
    { number: '1', name: 'Episode 1', duration: '30 minutes', aired: 'January 1, 2022' },
    { number: '2', name: 'Episode 2', duration: '25 minutes', aired: 'January 8, 2022' },
    { number: '3', name: 'Episode 3', duration: '43 minutes', aired: 'January 20, 2022' },
    { number: '4', name: 'Episode 4', duration: '36 minutes', aired: 'January 26, 2022' },
    { number: '1', name: 'Episode 1', duration: '30 minutes', aired: 'January 1, 2022' },
    { number: '2', name: 'Episode 2', duration: '25 minutes', aired: 'January 8, 2022' },
    { number: '3', name: 'Episode 3', duration: '43 minutes', aired: 'January 20, 2022' },
    { number: '4', name: 'Episode 4', duration: '36 minutes', aired: 'January 26, 2022' },
    { number: '1', name: 'Episode 1', duration: '30 minutes', aired: 'January 1, 2022' },
    { number: '2', name: 'Episode 2', duration: '25 minutes', aired: 'January 8, 2022' },
    { number: '3', name: 'Episode 3', duration: '43 minutes', aired: 'January 20, 2022' },
    { number: '4', name: 'Episode 4', duration: '36 minutes', aired: 'January 26, 2022' },
    { number: '1', name: 'Episode 1', duration: '30 minutes', aired: 'January 1, 2022' },
    { number: '2', name: 'Episode 2', duration: '25 minutes', aired: 'January 8, 2022' },
    { number: '3', name: 'Episode 3', duration: '43 minutes', aired: 'January 20, 2022' },
    { number: '4', name: 'Episode 4', duration: '36 minutes', aired: 'January 26, 2022' },
    { number: '1', name: 'Episode 1', duration: '30 minutes', aired: 'January 1, 2022' },
    { number: '2', name: 'Episode 2', duration: '25 minutes', aired: 'January 8, 2022' },
    { number: '3', name: 'Episode 3', duration: '43 minutes', aired: 'January 20, 2022' },
    { number: '4', name: 'Episode 4', duration: '36 minutes', aired: 'January 26, 2022' },
    { number: '1', name: 'Episode 1', duration: '30 minutes', aired: 'January 1, 2022' },
    { number: '2', name: 'Episode 2', duration: '25 minutes', aired: 'January 8, 2022' },
    { number: '3', name: 'Episode 3', duration: '43 minutes', aired: 'January 20, 2022' },
    { number: '4', name: 'Episode 4', duration: '36 minutes', aired: 'January 26, 2022' },

  ];

}
