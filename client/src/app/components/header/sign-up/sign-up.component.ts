import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms'; // Import AbstractControl
import { NgClass, NgIf } from "@angular/common";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute} from "@angular/router"; // Import Users as a named export
@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  styleUrl:'./sign-up.component.css'
})
export class SignUpComponent {
  @Output() signUp = new EventEmitter();
  form: FormGroup;
  country ="";
  description="";
  profilePicture = "";
  constructor(private formBuilder: FormBuilder, private Users: AuthService, private router: ActivatedRoute) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9\s]{8,}$/)]],
      repeat_password: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  submitForm() {
    if (this.form.valid) {
      const { username, email, password } = this.form.value
      // @ts-ignore
      this.Users.signUp(username, email, password, this.country, this.description, this.profilePicture  )
        .then((response: any)  => {
          const { code, user } = response;
          console.log("response", response);
          console.log("code", code);
          console.log("user", user);
          if (code === 200 && user) {

            this.signUp.emit({ code, user });
          } else if (code === 480) {
            // User already exists
          } else if (code === 460) {
            // Email already exists
          }
        })
        .catch((error: any)  => {
          console.error(error);
        });
    }
  }

  closesignUp() {
    this.signUp.emit();
  }

  // Custom validator function
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const repeatPassword = control.get('repeat_password');

    if (password && repeatPassword && password.value !== repeatPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }
}



