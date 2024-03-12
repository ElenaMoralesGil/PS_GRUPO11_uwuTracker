import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  @Output() signUp = new EventEmitter();

  signUpClicked() {
    this.signUp.emit();
  }

}

