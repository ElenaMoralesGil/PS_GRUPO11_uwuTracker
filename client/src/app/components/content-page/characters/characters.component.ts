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

  
  characters2 = [
    { name: 'name', rol: 'Rol', voiceOf: 'Voice Of' },
    { name: 'Son Goku', rol: 'Protagonista', voiceOf: 'Mazaco Nozawa' },
    { name: 'Vegeta', rol: 'Protagonista', voiceOf: 'Rio Horikawa' },
    { name: 'Broly', rol: 'Secundario', voiceOf: 'Bin Shimada' },

  ];

  

}
