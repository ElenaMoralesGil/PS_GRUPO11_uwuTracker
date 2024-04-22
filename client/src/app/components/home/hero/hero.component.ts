import { ChangeDetectionStrategy, Component, Input, InputSignal, OnInit, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiContentService } from '../../../services/api-content.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit {

  id: string = ""
  title: string = ""
  description: string = ""
  imageSource: string = ""

  constructor(private Contents: ApiContentService) {
  }
  ngOnInit(): void {

    this.Contents.find({}, { orderBy: 'likes', orderByDir: 'desc', limit: 1 }).then(contents => {
      const content = contents[ 0 ];
      this.id = content.id
      this.title = content.title
      this.description = content.synopsis
      this.imageSource = content.coverImg
    })
  }
}