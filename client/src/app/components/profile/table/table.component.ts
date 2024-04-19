import {Component, Input, OnInit, Output} from '@angular/core';
import {EmergencyPopupComponent} from "../emergency-popup/emergency-popup.component";
import {NormalRowComponent} from "./normal-row/normal-row.component";
import {ActivatedRoute} from "@angular/router";
import Content from "../../../schemas/Content.schema";
import {ApiContentService} from "../../../services/api-content.service";
import {UsersService} from "../../../services/users.service";
import {of} from "rxjs";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {ProgressRowComponent} from "./progress-row/progress-row.component";
import User from "../../../schemas/User.schema";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    EmergencyPopupComponent,
    NormalRowComponent,
    NgForOf,
    KeyValuePipe,
    NgIf,
    ProgressRowComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{

  username: string = "" ;
  listName: string = 'watching';
  isWatching: boolean = false;
  user?:User | null;
  list: { [key: string]: {  coverImg: string, title: string, score: number, status: string, type: string, year?: number, userScore?:number, genres?:string[], contentProgress:number, episodes?:number} } | undefined;

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
          this.username = params['username'];
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
      console.log('fetching contents from user', this.username, 'and list', contentList);

      const users = await this.UserService.find({"username": this.username});

      this.user = users? users[0]: null;
      // @ts-ignore
      this.list = await this.UserService.getContentsFromList( this.user?.id, contentList);
      console.log(this.list)
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }
  updateListOnCompleted(contentId: string): void {
    if (this.list) {
      delete this.list[contentId];
    }
  }
}
