import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router"

@Component({
  selector: 'app-normal-row',
  standalone: true,
  imports: [],
  templateUrl: './normal-row.component.html',
  styleUrl: './normal-row.component.css'
})
export class NormalRowComponent implements OnInit{
  @Input() rowTitle?: string = "text";
  @Input() rowUserScore?: number = 0
  @Input() rowContentScore?: number = 0;
  @Input() rowType?: string = "text";
  @Input() rowGenre?: string= "text";
  @Input() rowYear?: number= 0;
  @Input() rowContentCover?: string = "text";
  @Input() isDropped?: boolean = false;
  @Input() rowContentId?: string = "1111";
  constructor( private router : Router) {

  }

  ngOnInit(): void {

  }

  redirectToContent(contentId: string | undefined) {
  console.log( "contentId", contentId)
    this.router.navigate(["/content-page/", contentId]).then( );
  }
}
