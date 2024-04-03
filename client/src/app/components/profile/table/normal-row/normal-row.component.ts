import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-normal-row',
  standalone: true,
  imports: [],
  templateUrl: './normal-row.component.html',
  styleUrl: './normal-row.component.css'
})
export class NormalRowComponent implements OnInit{
  @Input() rowTitle?: string = "text";
  @Input() rowUserScore?: string = "text";
  @Input() rowContentScore?: number = 0;
  @Input() rowType?: string = "text";
  @Input() rowGenre?: string= "text";
  @Input() rowYear?: Date ;
  @Input() rowContentCover?: string = "text";
  @Input() isDropped?: boolean = false;
  constructor() { }

  ngOnInit(): void {

  }

}
