import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
  ValidationErrors
} from '@angular/forms';
import { AuthService } from "../../../services/auth.service";
import { UsersService } from "../../../services/users.service";
import {NgClass, NgIf} from "@angular/common";
import {ActivatedRoute, Route, Router} from "@angular/router";


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent  implements OnInit, OnChanges{
  @Output() editProfile = new EventEmitter();
  @Output() updateProfileDetails = new EventEmitter();
  @Output() updatePfp = new EventEmitter();
  @Input() userId?: string;
  @Input() username?: string;
  @Input() email?: string;
  @Input() description?: string;

  // @ts-ignore
  editDetailsForm: FormGroup;
  // @ts-ignore
  editPasswordForm: FormGroup;
  // @ts-ignore
  editPfpForm: FormGroup;
  profileImage: File | null = null;
  imageUrl: string | null = null;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForms();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['username'] || changes['email'] || changes['description']) {
      this.initializeForms();
    }
  }

  initializeForms() {
    this.editDetailsForm = this.formBuilder.group({
      username: [this.username, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(10)],
        asyncValidators: [this.checkUsernameExists.bind(this)],
        updateOn: 'blur'
      }],
      email: [this.email, {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.checkEmailExists.bind(this)],
        updateOn: 'blur'
      }],
      description: [this.description, [Validators.minLength(10), Validators.maxLength(500)]]
    });

    this.editPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required,Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
      repeat_password: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });

    this.editPfpForm = this.formBuilder.group({
      profileImage: [null, Validators.required]
    });
  }

  deleteProfile() {
    if (confirm(`Do you want to delete your account?`)) {
      if(this.userId) {
        this.usersService.deleteAccount(this.userId).then(r => {
          this.router.navigate(['']);
          this.authService.logout();
        } );
      }
    }

  }
  getEditDetailsFormErrors(controlName: string) {
    return this.getControlErrors(this.editDetailsForm, controlName);
  }
  getControlErrors(form: FormGroup, controlName: string) {
    const control = form.get(controlName);
    return control ? control.errors : null;
  }
  async submitForm() {
    if(this.editDetailsForm) {
      console.log( "usernameErrors",this.getEditDetailsFormErrors('username'));
      console.log( "emailErrors", this.getEditDetailsFormErrors('email'));
      console.log("descriptionErrors", this.getEditDetailsFormErrors('description'));
      console.log('Form value:', this.editDetailsForm.value);
      console.log(this.editDetailsForm.status);
      if (this.editDetailsForm.valid) {
        let {username, email, description} = this.editDetailsForm.value;
        if (description === undefined) description = ""
        if (this.userId) {
          this.usersService.modifyUserDetails(this.userId, username, email, description).then(r => {
            if (r) {
              this.updateProfileDetails.emit({username, email, description})
              this.closeEdit()
            }
          })
        }
      }
    }
  }

  async updatePassword() {
    if(this.editPasswordForm)
    if (this.editPasswordForm.valid) {
      const password = this.editPasswordForm.get('password')?.value;
      if(this.userId) await this.usersService.updatePassword(this.userId, password). then( r => this.closeEdit() );

    }
  }
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const repeatPassword = control.get('repeat_password');

    if (password && repeatPassword && password.value !== repeatPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  async checkUsernameExists(control: AbstractControl): Promise<ValidationErrors | null> {
    const username = control.value;
    console.log("username", username, "currentUsername", this.username)
    if (username === this.username) {
      return null;
    }

    try {
      const exists = await this.usersService.checkUserexistence(username);

      if (exists) {
        return { 'usernameExists': true };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error checking username existence:', error);
      return { 'usernameExists': true };
    }
  }

  async checkEmailExists(control: AbstractControl): Promise<ValidationErrors | null> {
    const email = control.value;

    if (email === this.email) {
      return null;
    }

    try {
      const exists = await this.usersService.checkEmailexistence(email);

      if (exists) {
        return { 'emailExists': true };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error checking email existence:', error);
      return { 'emailExists': true };
    }
  }



  onProfileImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      this.profileImage = inputElement.files[0];
      this.imageUrl = URL.createObjectURL(this.profileImage);
    }
  }
  async updateProfilePicture() {

    if (this.editPfpForm && this.editPfpForm.valid) {

      const formData = new FormData();
      formData.append('profileImage', this.profileImage as Blob);

      if(this.userId && this.profileImage) {
        await this.usersService.updateProfilePicture(this.userId, this.profileImage).then( r => {
          if (r) {
            this.updatePfp.emit(r)
            this.closeEdit()
          }
        })
      }
    }
  }

  closeEdit() {
    this.editProfile.emit();
  }

  protected readonly FormGroup = FormGroup;
}
