import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [ './profile.component.css' ]

})
export class PerfilComponent {
  profilePhotoUrl: string = 'https://via.placeholder.com/150'; // URL de la foto de perfil por defecto

  onPhotoSelected(event: any): void {
    const file: File = event.target.files[ 0 ];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.profilePhotoUrl = reader.result as string;
      };
    }
  }
}




