import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
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

  constructor(private router: ActivatedRoute, private apiService: ApiContentService) { }
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

  episodeHeader = ["Number", "Name", "Rate", "Fecha de publicacion"];



}
