import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ContentPageComponent } from '../content-page.component';
import { ApiContentService } from '../../../services/api-content.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [ NgFor ],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent {
  //@Input() episodes: any[] | undefined;
  @Input() number: string | undefined;
  @Input() name: string | undefined;
  @Input() duration: string | undefined;
  @Input() aired: string | undefined;

  constructor(private router: ActivatedRoute, private content: ContentPageComponent, private apiService: ApiContentService) { }
  episodes: any[] = []
  ngOnInit(): void {
    const id = this.router.parent?.snapshot.params[ 'id' ]
    if (id) {
      console.log(id)
      this.apiService.getEpisodes(id).then(res => {
        this.episodes = res.data;
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

  ];

  constructor() { }
}
