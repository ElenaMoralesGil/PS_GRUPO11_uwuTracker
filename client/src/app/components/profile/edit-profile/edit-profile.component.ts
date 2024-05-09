import {Component, EventEmitter, Input, Output} from '@angular/core';
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
export class EditProfileComponent {
  @Output() editProfile = new EventEmitter();
  @Output() updateProfileDetails = new EventEmitter();
  @Output() updatePfp = new EventEmitter();
  @Input() userId?: string;
  @Input() username?: string;
  @Input() email?: string;
  @Input() description?: string;

  editDetailsForm: FormGroup;
  editPasswordForm: FormGroup;
  editPfpForm: FormGroup;
  profileImage: File | null = null;
  imageUrl: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router
  ) {
    this.editDetailsForm = this.formBuilder.group({
      username: ['', {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(10)],
        asyncValidators: [this.checkUsernameExists.bind(this)],
        updateOn: 'blur'
      }],
      email: ['', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.checkEmailExists.bind(this)],
        updateOn: 'blur'
      }],
      description: ['', [Validators.minLength(10), Validators.maxLength(500)]]
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

  async submitForm() {

    if (this.editDetailsForm.valid) {

      const { username, email, description } = this.editDetailsForm.value;

      if(this.userId) {
        this.usersService.modifyUserDetails(this.userId, username, email, description).then( r => {
          if (r) {
            this.updateProfileDetails.emit({username,email,description} )
            this.closeEdit()
          }
        })
      }
    }
  }

  async updatePassword() {
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

    if (username === this.username) {
      return null;
    }

    const exists = await this.usersService.checkUserexistence(username);

    if (exists) {
      return { 'usernameExists': true };
    } else {
      return null;
    }
  }

  async checkEmailExists(control: AbstractControl): Promise<ValidationErrors | null> {
    const email = control.value;


    if (email === this.email) {
      return null;
    }

    const exists = await this.usersService.checkEmailexistence(email);

    if (exists) {
      return { 'emailExists': true };
    } else {
      return null;
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
    if (this.editPfpForm.valid) {
      const formData = new FormData();
      formData.append('profileImage', this.profileImage as Blob);
      console.log("profileImg", this.profileImage)
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
}
