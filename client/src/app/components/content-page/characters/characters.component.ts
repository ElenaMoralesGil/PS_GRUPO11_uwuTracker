import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export class CharactersComponent {
 
  @Input() characters: string[] = [];
  show: Boolean = false;
  activarCss: Boolean = false;

  nameClick: Boolean = false;
  
  characters2 = [
    { name: 'Text', description: 'Lorem Ipsum', img: '../../../../assets/images/frieren.jpg', showDescription: false },
    { name: 'Text', description: 'Lorem Ipsum', img: '../../../../assets/images/shoujo-shuumatsu.jpeg', showDescription: false },
    { name: 'Text', description: 'Lorem Ipsum', img: '../../../../assets/images/frieren.jpg', showDescription: false }
  ];

  clickName(){
    this.nameClick = !this.nameClick;
  }

  toggleDescription(character: any): void {
    character.showDescription = !character.showDescription;
    
  }
  

}
