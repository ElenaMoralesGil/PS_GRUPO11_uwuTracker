import { Component, OnInit } from '@angular/core';
import { RankheaderComponent } from './rankheader/rankheader.component';
import { RankpositionComponent } from './rankposition/rankposition.component';
import { ApiContentService } from '../../services/api-content.service';
import Content from '../../schemas/Content.schema';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [RankheaderComponent, RankpositionComponent],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent implements OnInit{
  rankingPositions:Content[] = []
  contentsService: ApiContentService;
  constructor(contentService: ApiContentService) {
    this.contentsService = contentService;
  }
  ngOnInit(): void {
    this.contentsService.find([], {orderBy: 'score', orderByDir:'desc', limit:50}).then(contents => {
      this.rankingPositions = <Content[]>contents;
    })
  }
}
