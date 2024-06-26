import {Component, Input} from '@angular/core';
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    EditProfileComponent,
    NgClass
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  @Input() username?: string;
  @Input() email?: string;
  @Input() description?: string;
  @Input() profilePicture?: string;
  @Input() accountId?: string;
  @Input() userId?: string;
  @Input() socialMedia?: any[]
  openEdit: boolean = false;
  openEditWindow() {
    this.openEdit = true;
  }
  closeEditWindow() {
    this.openEdit = false;
  }

  updatePfp(updateProfilePicture: string ) {
    this.profilePicture = updateProfilePicture;
  }

  updateDetails(data: { username: string, email: string, description: string }): void {

    this.username = data.username;
    this.email = data.email;
    this.description = data.description;
  }

  updateSocial(socialMedia: any[]) {
    this.socialMedia= socialMedia;
  }
  openSocialMedia(platform: string) {
    const socialUrl = this.socialMedia ? this.socialMedia[this.getSocialIndex(platform)] : '';
    if (socialUrl) {
      window.open(socialUrl, "_blank");
    }
  }

  getSocialIndex(platform: string): number {
    switch (platform) {
      case 'instagram':
        return 0;
      case 'facebook':
        return 1;
      case 'twitter':
        return 2;
      default:
        return -1;
    }
  }
}
