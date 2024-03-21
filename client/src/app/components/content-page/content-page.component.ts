import { Component, OnInit } from '@angular/core';
import { ApiContentService } from '../../services/api-content.service';
import { ActivatedRoute } from '@angular/router';
import { CommentsComponent } from '../comments/comments.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { TableComponent } from './table/table.component';
import { NewCommentComponent } from '../comments/new-comment/new-comment.component';
import { AsideInformationComponent } from './aside-information/aside-information.component';
import { NavComponent } from './nav/nav.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-content-page',
  standalone: true,
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.css',
  imports: [ CommentsComponent, NgFor, CabeceraComponent, TableComponent, AsideInformationComponent, NewCommentComponent, NavComponent ]
})
export class ContentPageComponent implements OnInit {

  protected id?: string


  protected year?: Date
  protected type?: string


  informationAside: string[] = [];
  description: string[] = [];
  title: string[] = [];
  img: string[] = [];




  constructor(private Contents: ApiContentService, private router: ActivatedRoute) {}

  async ngOnInit() {
    let content
    try { content = await this.Contents.findById(this.router.snapshot.paramMap.get("id") || "") }
    catch { return this.id = 'not-found' }

    if (!content?.id) return this.id = 'not found'

    this.id = content.id
    this.title = [`${content.title}`]
    this.description = [`${content.synopsis}`]
    this.img = [`${content.coverImg}`]


    // this.informacion = <resultado de la API>


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
}