import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['../sign-up/sign-up.component.css']
})
export class SignInComponent implements OnInit{
  form: FormGroup;
  @Output() signIn = new EventEmitter();

  constructor(form: FormGroup) {
    this.form = form;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  get username(){
    return this.form.get('username');
  }
  get email(){
    return this.form.get('email');
  }
  get password(){
    return this.form.get('password');
  }

  signInClicked() {
    if (this.form.valid) {
      this.signIn.emit(this.form.value);
    }
  }
}
