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

  characters1: any[] = [];

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

  /*characters2 = [
    { name: 'Text', description: 'Lorem Ipsum', img: '../../../../assets/images/frieren.jpg', showDescription: false },
    { name: 'Text', description: 'Lorem Ipsum', img: '../../../../assets/images/shoujo-shuumatsu.jpeg', showDescription: false },
    { name: 'Text', description: 'Lorem Ipsum', img: '../../../../assets/images/frieren.jpg', showDescription: false }
  ];*/

  clickName(){
    this.nameClick = !this.nameClick;
  }

  toggleDescription(character: any): void {
    character.showDescription = !character.showDescription;
    
  }
  

}
