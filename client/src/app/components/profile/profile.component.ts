import {Component, OnInit} from '@angular/core';
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {ProfileNavComponent} from "./profile-nav/profile-nav.component";
import {TableComponent} from "./table/table.component";
import {UserInfoComponent} from "./user-info/user-info.component";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import User from "../../schemas/User.schema";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    EditProfileComponent,
    ProfileNavComponent,
    TableComponent,
    UserInfoComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User = {
    id: ' ',
    username: ' ',
    email: ' ',
    password: ' ',
    reviews: [],
    description: ' ',
   country: ' ',
    profilePicture: ' '
  };
  userId: string ="";
  constructor(
    private userService: UsersService,
    private router: ActivatedRoute,
    private route: Router
  ) { }

    async ngOnInit(): Promise<void> {
      try {
       this.userId = this.router.snapshot.paramMap.get("id") || "";
        const user = await this.userService.findById(this.userId);

        if (!user?.id) {
          console.error('Content not found or ID is undefined.');
          return;
        } else {
          this.user = user;
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    }


}
