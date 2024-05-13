import { ChangeDetectionStrategy, Component, Input, InputSignal, OnInit, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiContentService } from '../../../services/api-content.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ RouterLink, TitleCasePipe],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit {

  id: string = ""
  title: string = ""
  description: string = ""
  imageSource: string = ""
  info:({
    id: string;
    value: number|string|Date;
})[] = []

  constructor(private Contents: ApiContentService) {
  }
  ngOnInit(): void {

    this.Contents.find({}, { orderBy: 'likes', orderByDir: 'desc', limit: 1 }).then(contents => {
      const content = contents[ 0 ];
      this.id = content.id
      this.title = content.title
      this.description = content.synopsis
      this.imageSource = content.coverImg
      this.info = [{id:'score', value: content.score}, {id: 'likes', value: content.likes}, {id: 'season', value: content.season || 'Not Defined'}, {id: 'year', value:  content.year || 'Not Defined'}]
    })
  }
}