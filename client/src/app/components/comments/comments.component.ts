import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../../services/comments.service';
import { ActivatedRoute } from '@angular/router';

import Comment from '../../schemas/Comment.schema';
import { CommentFormComponent } from "./comment-form/comment-form.component";
import { CommentComponent } from './comment/comment.component';

@Component({
  selector: 'app-comments',
  standalone: true,
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
  imports: [
    CommonModule,
    CommentFormComponent,
    CommentComponent
  ]
})
export class CommentsComponent implements OnInit {

  protected comments: Comment[] = []

  constructor(private route: ActivatedRoute, private Comments: CommentsService) { }


  ngOnInit(): void {

    const id = this.route.parent?.snapshot.params[ 'id' ]
    this.Comments.find({ contentId: id }, { orderBy: 'timestamp', orderByDir: 'desc' })
      .then(res => res.data)
      .then(data => {

        if (!data) {
          this.comments = []
          return
        }

        const level0: Comment[] = [], level1: Comment[] = []
        data.forEach(elm => {
          switch (elm.level) {
            case 1: level1.push(elm); break
            case 0:
              elm.comments = []
              level0.push(elm)
              break
          }
        })

        level1.forEach(elm => this.comments.find(elm_ => elm_.id == elm.father)?.comments?.push(elm))
      })
  }



}
