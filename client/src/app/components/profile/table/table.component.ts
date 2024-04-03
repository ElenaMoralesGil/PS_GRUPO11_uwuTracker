import {Component, Input, OnInit, Output} from '@angular/core';
import {EmergencyPopupComponent} from "../emergency-popup/emergency-popup.component";
import {NormalRowComponent} from "./normal-row/normal-row.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    EmergencyPopupComponent,
    NormalRowComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{
  @Input() title: string = "text";
  @Input() userScore?: string = "text";
  @Input() contentScore?: string = "text";
  @Input() type?: string = "text";
  @Input() genre?: string= "text";
  @Input() year?: string = "text";
  @Input() contentCover?: string = "text";
  @Input() episodesNumber?: string = "text";
  @Input() episodesWatched?: string = "0";



  isWatching: boolean = false;
  constructor(private route: ActivatedRoute) { }


  isDropped?: boolean = false;

  ngOnInit(): void {

    this.route.url.subscribe(urlSegments => {
      const lastSegment = urlSegments[urlSegments.length - 1].path;
      if (lastSegment === 'watching') {
        this.isWatching = true;
      }
      if (lastSegment === 'dropped') {
        this.isDropped= true;
      }


    });



  }
}
