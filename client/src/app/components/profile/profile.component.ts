import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { UsersService } from "../../services/users.service";
import User from "../../schemas/User.schema";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { UserInfoComponent } from "./user-info/user-info.component";
import { ProfileNavComponent } from "./profile-nav/profile-nav.component";
import { TableComponent } from "./table/table.component";
import { ApiContentService } from "../../services/api-content.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [
    EditProfileComponent,
    RouterOutlet,
    UserInfoComponent,
    ProfileNavComponent,
    TableComponent
  ],
  styleUrls: [ './profile.component.css' ]
})
export class ProfileComponent implements OnInit {
  user: User = {
    id: '',
    username: '',
    email: '',
    password: '',
    reviews: [],
    description: '',
    country: '',
    profilePicture: '',
    watching: [],
    dropped: [],
    completed: [],
    planToWatch: [],
    favorites: [],
    userScores: new Map<string, number>(),
    contentProgress: new Map<string, number>(),
    likedReviews: [],
    dislikedReviews: [],
    socialMedia: []
  };
  username: string = "";
  accountId?: string;

  constructor(
    private userService: UsersService,
    private router: ActivatedRoute,
    private authService: AuthService,

  ) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(async params => {
      this.username = params.get("username") || "";
      this.authService.user.subscribe((user: User | null) => {
        this.accountId = user?.id;
      });
      const users = await this.userService.find({ "username": this.username });
      const user = users ? users[ 0 ] : null
      if (!user?.id) {
        console.error('User not found or ID is undefined.');
        return;
      } else {
        this.user = user;
      }
    });
  }


}
