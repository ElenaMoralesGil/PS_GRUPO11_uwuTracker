import {booleanAttribute, Component, EventEmitter, input, Output} from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms"; // Import SignInComponent
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    SignInComponent,
    SignUpComponent,
    RouterLink,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    SignInComponent
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userLogged = input(false, {
    transform:booleanAttribute
  });
  @Output() isUserChange = new EventEmitter<boolean>();
  showSignInModal = false;
  showSignUpModal = false;

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

  signOut() {
    this.isUserChange.emit(false);
  }
}
