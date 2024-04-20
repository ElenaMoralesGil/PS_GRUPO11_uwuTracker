import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { Observable } from "rxjs";
import User from "../../schemas/User.schema";
import { AuthService } from "../../services/auth.service";
import { StaffComponent } from './staff/staff.component';

@Component({
  selector: 'app-content-page',
  standalone: true,
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.css',
  imports: [ CommentsComponent, NgFor, NgIf, CabeceraComponent, StaffComponent, RouterOutlet, CharactersComponent, EpisodesComponent, AsideInformationComponent, NewCommentComponent, NavComponent ]
})
export class ContentPageComponent implements OnInit {

  protected id?: string


  protected year?: Date
  protected type?: string
  protected rating?: number

  protected description?: string
  protected title?: string
  protected img?: string
  userId?: string;
  episodes: string[] = [];
  loggedInUser: Observable<User | null>
  likes?: number
  informationAside: { likes: number, type: string; source: string; episodesNumber: string; duration: string, status: string, season: string; year: string; studios: string; genres: string; rating: string; }[] = []


  protected source?: string
  protected duration?: number
  protected status?: string
  protected season?: string

  protected characterName?: string

  characters: string[] = [];


  constructor(private Contents: ApiContentService,
    private router: ActivatedRoute,
    private authService: AuthService,
    private cdr: ChangeDetectorRef) {
    this.loggedInUser = this.authService.user
    this.loggedInUser.subscribe(user => { this.userId = user?.id })
  }

  async ngOnInit() {
    let content
    try {
      content = await this.Contents.findById(this.router.snapshot.paramMap.get("id") || "")
      this.authService.user.subscribe((user: User | null) => {
        this.userId = user?.id;
      });
    } catch { return this.id = 'not-found' }

    if (!content?.id) return this.id = 'not found'



    this.id = content.id
    this.title = content.title
    this.description = content.synopsis
    this.rating = content.score
    this.likes = content.likes
    this.img = content?.coverImg || '../../assets/shoujo-shuumatsu.jpeg'


    //Info que tendrá el Aside
    try {

      this.informationAside = [
        { likes: content.likes, type: `${content.type}`, source: `${content.source}`, episodesNumber: `${content.episodesNumber}`, duration: `${content.duration}`, status: `${content.status}`, season: `${content.season}`, year: `${content.year}`, studios: `${content.studio}`, genres: `genres`, rating: `${content.score}` },

      ]

      //this.informacion = await this.Contents.obtenerInformacion(); // cambiar metodo por la info de la API
    } catch (error) {
      console.error('Information Aside not found', error);
    }



    return
  }
  onLikesChanged(likes: number) {
    this.likes = likes;
    this.informationAside = this.informationAside.map(info => ({ ...info, likes })); // Immutable update
    console.log("content-page", this.likes);
    //this.cdr.detectChanges();
  }
  getId() {
    return this.id
  }

  showEpisodes() {

  }

}
