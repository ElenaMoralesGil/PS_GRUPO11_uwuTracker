import {Component, Input, OnInit, Output} from '@angular/core';
import {EmergencyPopupComponent} from "../emergency-popup/emergency-popup.component";
import {NormalRowComponent} from "./normal-row/normal-row.component";
import {ActivatedRoute} from "@angular/router";
import Content from "../../../schemas/Content.schema";
import {ApiContentService} from "../../../services/api-content.service";
import {UsersService} from "../../../services/users.service";
import {of} from "rxjs";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    EmergencyPopupComponent,
    NormalRowComponent,
    NgForOf,
    KeyValuePipe,
    NgIf
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{

  userId: string = "" ;
  listName: string = 'watching';
  isWatching: boolean = false;

  list: { [key: string]: { coverImg: string, title: string, score: number, status: string, type: string, year?: number, userScore?:number | null } } | undefined;

  constructor(
    private route: ActivatedRoute,
    private UserService: UsersService
  ) { }


  isDropped?: boolean = false;

  async ngOnInit(): Promise<void> {
    try {


      const parentRoute = this.route.parent;

      if (parentRoute) {

        parentRoute.params.subscribe(params => {
          this.userId = params['id'];
        });
      }




      this.route.url.subscribe(async urlSegments => {
        const lastSegment = urlSegments[urlSegments.length - 1].path;
        if (lastSegment === 'watching') {
          this.isWatching = true;
        }
        if (lastSegment === 'dropped') {
          this.isDropped = true;
        }
        this.listName = lastSegment;

        this.getContentsFromList(this.listName).then(() => {
          console.log("list", this.list);


        });

      });
    }
    catch (error) {
      console.error('Error fetching table:', error);
    }
  }
  async getContentsFromList(contentList: string): Promise<void> {
    if (!contentList) {
      console.error('contentList is undefined.');
      return;
    }

    try {
      console.log('fetching contents from user', this.userId, 'and list', contentList);
      // @ts-ignore
      this.list = await this.UserService.getContentsFromList( this.userId, contentList);



    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }
}
