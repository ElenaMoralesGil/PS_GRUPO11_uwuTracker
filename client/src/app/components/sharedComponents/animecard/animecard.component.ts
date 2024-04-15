import { NgFor } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-animecard',
  standalone: true,
  imports: [NgFor],
  templateUrl: './animecard.component.html',
  styleUrl: './animecard.component.css'
})
export class AnimecardComponent {
  @Input() animeList: string[] | undefined;

  //@Input() animeName: string | undefined;
  //@Input() imageSource: string | undefined;

  
  animeName = input("Shoujo Shuumatsu Ryoukou");
  imageSource = input("../../assets/shoujo-shuumatsu.jpeg");
}
