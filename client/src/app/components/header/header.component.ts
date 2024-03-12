import { Component } from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common"; // Import SignInComponent
import Users from "../../models/User.model";
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    SignInComponent,
    SignUpComponent,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userLogged = false;
  showSignInModal = false;
  showSignUpModal = false;

  // funcion para enseñar el header de usuario registrado
  headerLogged() {
    this.userLogged = true;
  }

  headerUnLogged() {
    this.userLogged = false;
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

  LogOut() {}

  handleSignIn(formData: any) {
    console.log(formData); // Just printing form data for demonstration
    Users.signIn(formData)
    this.closeSignInModal();
  }
}
