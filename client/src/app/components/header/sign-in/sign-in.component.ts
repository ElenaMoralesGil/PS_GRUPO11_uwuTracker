import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgIf } from "@angular/common";
import Users from '../../../models/User.model';
import User from "../../../schemas/User.schema"; // Import Users as a named export

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  styleUrls: ['../sign-up/sign-up.component.css']
})
export class SignInComponent {
  @Output() signIn = new EventEmitter();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9\s]{8,}$/)]]
    });
  }

  submitForm() {
    if (this.form.valid) {
      const { username, email, password } = this.form.value;
      // Assuming Users.signIn returns a Promise
      Users.signIn(username, email, password)
        .then((response: any)  => {
          const { code, user } = response;
          if (code === 200 && user) {
            // Valid user
            this.signIn.emit({ code, user });
          } else if (code === 550) {
            // User already exists
          } else if (code === 580) {
            // Email already exists
          }
        })
        .catch((error: any)  => {
          console.error(error);
        });
    }
  }

  closeSignIn() {
    this.signIn.emit();
  }
}
