import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
export class ProgressRowComponent implements OnChanges {
  @Input() rowTitle?: string;
  @Input() rowTotalChapters?: number;
  @Input() rowGenres?: string[];
  @Input() rowContentScore?:number;
  @Input() rowType?: string;
  @Input() rowContentCover?: string;
  @Input() rowContentId?: string;
  @Input() user?: string;
  @Input() episodes?:number;
  @Output() changeToCompleted = new EventEmitter<string>();
  private _rowProgress: number = 0;

  @Input()
  get rowProgress(): number {
    return this._rowProgress;
  }

  set rowProgress(value: number) {
    this._rowProgress = value;
    this.checkProgress();
  }

  constructor(private UsersService: UsersService) {
  }

  async incrementEpisodesCount() {
    if (<number>this.rowProgress < <number>this.episodes ) {
      this.rowProgress = await this.UsersService.incrementEpisodesCount(this.user, this.rowContentId);
      console.log(this.rowProgress);
    }
  }
  async decrementEpisodesCount() {
    if (<number>this.rowProgress > 0 ) {
      this.rowProgress = await this.UsersService.decrementEpisodesCount(this.user, this.rowContentId);
      console.log(this.rowProgress);
    }
  }

  async checkProgress() {
    if (this.rowProgress === this.episodes) {
      if (confirm(`¿Do u want to move ${this.rowTitle} to the completed list?`)) {
        await this.UsersService.trackingList(this.user, this.rowContentId, "completed");
        this.changeToCompleted.emit(this.rowContentId)
      } else {
        this.rowProgress = await this.UsersService.decrementEpisodesCount(this.user, this.rowContentId);
      }
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['rowProgress']) {
      if (this.rowProgress !== undefined && this.rowProgress === this.episodes) {
        this.checkProgress();
      }
    }
  }
}
