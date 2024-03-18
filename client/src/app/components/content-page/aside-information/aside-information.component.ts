import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
  animeData = [
    { text1: 'Text1-1', text2: 'Text1-2' },
    { text1: 'Text2-1', text2: 'Text2-2' },
    { text1: 'Text3-1', text2: 'Text3-2' },
    { text1: 'Text4-1', text2: 'Text4-2' },
  ];
}
