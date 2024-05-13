import { booleanAttribute, Component, EventEmitter, input, Output } from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from "./sign-up/sign-up.component";
import { RouterLink } from "@angular/router";
import { CommonModule, NgIf } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms"; // Import SignInComponent
import { Observable } from 'rxjs';
import User from '../../schemas/User.schema'
import { AuthService } from '../../services/auth.service';
import {MobileMenuComponent} from "./mobile-menu/mobile-menu.component";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    CommonModule,
    SignInComponent,
    SignUpComponent,
    RouterLink,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    SignInComponent,
    MobileMenuComponent
  ],
  styleUrls: [ './header.component.css' ]
})
export class HeaderComponent {
  protected userLogged$!: Observable<User | null>
  showSignInModal = false;
  showSignUpModal = false;
  showMobileMenu = false;
  constructor(private Auth: AuthService) {
    this.userLogged$ = Auth.user
  }

  showSignIn() {
    this.showSignInModal = true;
    this.showSignUpModal = false;
  }

  showSignUp() {
    this.showSignInModal = false;
    this.showSignUpModal = true;
  }

  closeSignInModal() {
    this.showSignInModal = false;
  }

  closeSignUpModal() {
    this.showSignUpModal = false;
  }

  logout() {
    this.Auth.logout()
  }

  mobileMenu() {
    this.showMobileMenu = !this.showMobileMenu
  }
}
