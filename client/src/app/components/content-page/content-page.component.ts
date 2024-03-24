import { Component, OnInit } from '@angular/core';
import { ApiContentService } from '../../services/api-content.service';
import { ActivatedRoute } from '@angular/router';
import { CommentsComponent } from '../comments/comments.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { NewCommentComponent } from '../comments/new-comment/new-comment.component';
import { AsideInformationComponent } from './aside-information/aside-information.component';
import { NavComponent } from './nav/nav.component';
import { NgFor, NgIf } from '@angular/common';
import { EpisodesComponent } from './episodes/episodes.component';
import { CharactersComponent } from './characters/characters.component';

@Component({
  selector: 'app-content-page',
  standalone: true,
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.css',
  imports: [ CommentsComponent, NgFor, NgIf, CabeceraComponent, CharactersComponent, EpisodesComponent, AsideInformationComponent, NewCommentComponent, NavComponent ]
})
export class ContentPageComponent implements OnInit {

  protected id?: string


  protected year?: Date
  protected type?: string


  informationAside: string[] = [];
  protected description?: string
  protected title?: string
  protected img?: string

  episodes: string[] = [];



  constructor(private Contents: ApiContentService, private router: ActivatedRoute) {}

  async ngOnInit() {
    let content
    try { content = await this.Contents.findById(this.router.snapshot.paramMap.get("id") || "") }
    catch { return this.id = 'not-found' }

    if (!content?.id) return this.id = 'not found'

    this.id = content.id
    this.title = content.title
    this.description = content.synopsis
    this.img = '../../assets/shoujo-shuumatsu.jpeg'
   
    /*this.episodes = [
      `${content.episodes.number}`,
      `${content.episodes.name}`,
      `${content.episodes.duration}`,
      `${content.episodes.aired}`
    ]*/


    try {
      this.informationAside = [ 
        `Year: ${content.year}`,
        `Type: ${content.type}`,
        `Episodes Number: ${content.episodesNumber}`
      ]

      //this.informacion = await this.Contents.obtenerInformacion(); // cambiar metodo por la info de la API
    } catch(error) {
      console.error('Information Aside not found', error);
    }

   

    return
  }

  showEpisodes() {
    
  }

}