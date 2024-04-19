import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {UsersService} from "../../../../services/users.service";

@Component({
  selector: 'app-progress-row',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './progress-row.component.html',
  styleUrl: '../normal-row/normal-row.component.css'
})
export class ProgressRowComponent {
  @Input() rowTitle?: string;
  @Input() rowProgress?: number = 0;
  @Input() rowTotalChapters?: number;
  @Input() rowGenres?: string[];
  @Input() rowContentScore?:number;
  @Input() rowType?: string;
  @Input() rowContentCover?: string;
  @Input() rowContentId?: string;
  @Input() user?: string;
  @Input() episodes?:number;



  constructor(private UsersService: UsersService) {
  }

 async incrementEpisodesCount() {
    console.log("here");
    if (<number>this.rowProgress < <number>this.episodes ) {
      this.rowProgress = await this.UsersService.incrementEpisodesCount(this.user, this.rowContentId);
    }
 }

}
