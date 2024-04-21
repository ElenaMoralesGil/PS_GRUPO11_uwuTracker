import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ApiContentService } from '../../../services/api-content.service';
import { ContentPageComponent } from '../content-page.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export class CharactersComponent {
 
  //@Input() characters: string[] = [];

  show: Boolean = false;
  activarCss: Boolean = false;
  nameClick: Boolean = false;

  selectedCharacters: { [key: string]: string } = {}; // Objeto para almacenar las descripciones por ID

  characters1: any[] = [];
  id: string = "";
  characterById?: any;
  description?: string;

  constructor(private router: ActivatedRoute, private contentService: ApiContentService) { }


  ngOnInit() {
    const id = this.router.parent?.snapshot.params['id']
    if (id) {
      console.log(id)
      this.contentService.getCharacters(id).then(res => {
        this.characters1 = res.data;
      });
    }
    
  }

  toggleDescription(charac: any): void {
    charac.showDescription = !charac.showDescription;
    const characterId = charac.character.mal_id;
    if (this.selectedCharacters[characterId]) {
      delete this.selectedCharacters[characterId]; 
    } else {
      this.contentService.getCharacterById(characterId).then(res => {
        console.log('Respuesta del servidor:', res);

        this.selectedCharacters[characterId] = res.character.about; 
      });
    }
    

  }
  

}
