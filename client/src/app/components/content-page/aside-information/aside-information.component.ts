import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForOf } from '@angular/common';



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
export class AsideInformationComponent implements OnChanges {
 
  @Input() information: {
    likes: number, source: string, year: string; type: string; episodesNumber: string; season: string;
    duration: string; status: string; studios: string; genres: any; rating: string;
  }[] = [];

  protected info:Array<[string, any]>

constructor(){

  this.info = this.getInfo()
}
  ngOnChanges(changes: SimpleChanges): void {
   
    this.info = this.getInfo()
  }


  infoTitle = [
    `likes`,
    `type`,
    `source`,
    `episodes`,
    `duration`,
    `status`,
    `season`,
    `year`,
    `studios`,
    `genres`,
    `rating`,

  ]


  getValue(item2: any, item1: string): string {
    return item2[ item1 ];
  }


  isUndefined(item: any): boolean {
    if (item === 'undefined') {
      return true;
    } else {
      return false
    }
  }


  getInfo = () => this.information?.[0] ?  Object.entries(this.information?.[0]).filter(elm => ( elm[1] != 'null' && elm[1] != 'undefined' ) ) : []
}
