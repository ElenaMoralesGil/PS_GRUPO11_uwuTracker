import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [NgFor],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css'
})
export class StaffComponent {
  @Input() staff: string[] = [];

  staff2 = [
    { name: 'Text', description: 'Lorem Ipsum', img: '../../../../assets/images/frieren.jpg'},
    { name: 'Text', description: 'Lorem Ipsum', img: '../../../../assets/images/shoujo-shuumatsu.jpeg' },
    { name: 'Text', description: 'Lorem Ipsum', img: '../../../../assets/images/frieren.jpg' }
  ];

}
