import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';



@Component({
  selector: 'app-aside-information',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './aside-information.component.html',
  styleUrl: './aside-information.component.css'
})
export class AsideInformationComponent {
  @Input() information: string[] = [];
  
  
}
