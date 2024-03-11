import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterLink} from "@angular/router";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SignInComponent,
    SignUpComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {

  showSignInModal = false;
  showSignUpModal = false;

  signIn() {
    this.showSignInModal = true;
    this.showSignUpModal = false;
  }

  signUp() {
    this.showSignInModal = false;
    this.showSignUpModal = true;
  }

  closeModals() {
    this.showSignInModal = false;
    this.showSignUpModal = false;
  }
}
