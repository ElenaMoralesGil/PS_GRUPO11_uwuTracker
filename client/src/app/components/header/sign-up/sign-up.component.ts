import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, FormsModule } from '@angular/forms'; // Import AbstractControl
import { NgClass, NgIf } from "@angular/common";
import { AuthService } from "../../../services/auth.service";

import { ActivatedRoute } from "@angular/router";
import {UsersService} from "../../../services/users.service"; // Import Users as a named export

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgClass
  ],
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  @Output() signUp = new EventEmitter();
  @Output() signIn = new EventEmitter();
  form: FormGroup;
  errorSignUp: boolean = false;
  description = "";
  profilePicture = "";
  constructor(private formBuilder: FormBuilder, private Auth: AuthService, private UserService: UsersService) {
    this.form = this.formBuilder.group({
      username: [ '', [ Validators.required, Validators.minLength(2) ] ],
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/u
      ) ] ],
      repeat_password: [ '', Validators.required ]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  submitForm() {
    if (this.form.valid) {
      const { username, email, password } = this.form.value
      try {
      this.UserService.signup({ username, email, password })
        .then((user)=> {
          if (user !== null) {
            this.Auth.login({ username, password })
            this.closesignUp()
            alert('SignUp successful');
          } else {
            this.errorSignUp = true;
          }
          })
        } catch (error) {
          console.error('Error during login:', error);
          this.errorSignUp = true;
        }
    }
    else console.log("NO SUBMIT")
  }

  closesignUp() {
    this.signUp.emit();
  }

  // Custom validator function
  passwordMatchValidator(control: AbstractControl): { [ key: string ]: boolean } | null {
    const password = control.get('password');
    const repeatPassword = control.get('repeat_password');

    if (password && repeatPassword && password.value !== repeatPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }

  redirectSignIn() {
    this.signIn.emit()
  }
}



