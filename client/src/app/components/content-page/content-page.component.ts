import { Component, OnInit } from '@angular/core';
import { ApiContentService } from '../../services/api-content.service';
import { ActivatedRoute } from '@angular/router';
import { CommentsComponent } from '../comments/comments.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { TableComponent } from './table/table.component';
import { NewCommentComponent } from '../comments/new-comment/new-comment.component';

@Component({
  selector: 'app-content',
  standalone: true,
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.css',
  imports: [ CommentsComponent, CabeceraComponent, TableComponent, NewCommentComponent ]
})
export class ContentComponent implements OnInit {

  protected id?: string
  protected title?: string = undefined
  protected description: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.";


  constructor(private Contents: ApiContentService, private router: ActivatedRoute) { }

  async ngOnInit() {
    let content
    try { content = await this.Contents.findById(this.router.snapshot.paramMap.get("id") || "") }
    catch { return this.id = 'not-found' }

    if (!content?.id) return this.id = 'not found'

    this.id = content.id
    this.title = content.title

    return
  }
}