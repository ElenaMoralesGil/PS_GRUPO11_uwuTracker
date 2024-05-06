import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, AbstractControl} from '@angular/forms';
import {NgClass, NgIf} from "@angular/common";
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './sign-in.component.html',
  styleUrl: '../sign-up/sign-up.component.css',
})
export class SignInComponent {
  @Output() signIn = new EventEmitter();
  errorLogin: boolean = false;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private Users: UsersService, private router: ActivatedRoute, private Auth: AuthService) {
    this.form = this.formBuilder.group({
      username: [ '', [ Validators.required, Validators.minLength(2) ] ],
      password: [ '', [ Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9\s]{8,}$/) ] ]
    }, {
      validators: this.login
    });
  }

  signInClicked() {
    this.signIn.emit();
  }

  async login() {
    const { username, password } = this.form.value;
    try {
      const response = await this.Auth.login({ username, password });
      console.log(response);
      if (response === 0) {
        this.signInClicked();
        alert('Login successful');
      } else {
        this.errorLogin = true;
      }
    } catch (error) {
      console.error('Error during login:', error);
      this.errorLogin = true;
    }
  }
}
