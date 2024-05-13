import {Component, Output, EventEmitter} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service'
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
  @Output() signUp = new EventEmitter();
  errorLogin: boolean = false;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private Users: UsersService, private router: ActivatedRoute, private Auth: AuthService) {
    this.form = this.formBuilder.group({
      username: [ '', [ Validators.required, Validators.minLength(2) ] ],
      password: [ '', [ Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/u
      ) ] ]
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
      this.Auth.login({ username, password })
        .then(user => user.toPromise())
        .then((user)=> {
        if (user) {
          this.signIn.emit()
          alert('SignIn successful');
        } else {
          this.errorLogin  = true;
        }
      });

    } catch (error) {
      console.error('Error during login:', error);
      this.errorLogin = true;
    }
  }

  redirectSignUp() {
    this.signUp.emit()
  }
}
