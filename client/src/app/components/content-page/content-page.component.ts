import { Component, OnInit } from '@angular/core';
import { ApiContentService } from '../../services/api-content.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
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
  imports: [ CommentsComponent, NgFor, NgIf, CabeceraComponent, RouterOutlet, CharactersComponent, EpisodesComponent, AsideInformationComponent, NewCommentComponent, NavComponent ]
})
export class ContentPageComponent implements OnInit {

  protected id?: string


  protected year?: Date
  protected type?: string
  protected rating?: number

  informationAside: { year: string; type: string; episodesNumber: string; season: string; }[] = []
  protected description?: string
  protected title?: string
  protected img?: string

  episodes: string[] = [];



  constructor(private Contents: ApiContentService, private router: ActivatedRoute) { }

  async ngOnInit() {
    let content
    try { content = await this.Contents.findById(this.router.snapshot.paramMap.get("id") || "")
    }
    catch { return this.id = 'not-found' }

    if (!content?.id) return this.id = 'not found'

    this.id = content.id
    this.title = content.title
    this.description = content.synopsis
    this.rating = content.score
    this.img = content?.coverImg || '../../assets/shoujo-shuumatsu.jpeg'



    /*this.episodes = [
      `${content.episodes.number}`,
      `${content.episodes.name}`,
      `${content.episodes.duration}`,
      `${content.episodes.aired}`
    ]*/

    //Info que tendrá el Aside
    try {

      this.informationAside = [
        { year: `${content.year}`, type: `${content.type}`, episodesNumber: `${content.episodesNumber}`, season: `${content.season}` },

      ]

      //this.informacion = await this.Contents.obtenerInformacion(); // cambiar metodo por la info de la API
    } catch (error) {
      console.error('Information Aside not found', error);
    }



    return
  }

  getId() {
    return this.id
  }

  showEpisodes() {

  }

}
