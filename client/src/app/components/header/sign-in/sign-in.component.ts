import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: '../sign-up/sign-up.component.css'
})
export class SignInComponent {
  @Output() signIn = new EventEmitter();

  signInClicked() {
    this.signIn.emit();
  }
}
