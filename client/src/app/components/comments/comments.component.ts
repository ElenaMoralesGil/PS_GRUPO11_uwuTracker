import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../../services/comments.service';
import { ActivatedRoute } from '@angular/router';

import Comment from '../../schemas/Comment.schema';
import { CommentFormComponent } from "./comment-form/comment-form.component";
import { CommentComponent } from './comment/comment.component';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import User from '../../schemas/User.schema';

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

  protected loggedInUser: Observable<User | null>
  protected comments: Comment[] = []
  protected formMessage: 'NONE' | 'CONFIRM' | string = 'NONE'

  constructor(private route: ActivatedRoute, private Comments: CommentsService, Auth: AuthService) {
    this.loggedInUser = Auth.user
  }


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

        this.comments = level0
        level1.forEach(elm => this.comments.find(elm_ => elm_.id == elm.father)?.comments?.push(elm))
      })
  }

  onFormClicked() {
    this.formMessage = 'NONE'
  }


  async commentFromForm(commentBody: string) {

    const user = await this.loggedInUser.toPromise()

    if (!user) {
      this.formMessage = 'No estas logueado'
      return
    }

    this.createComment({
      userId: (<User>user).id,
      username: (<User>user).username,
      contentId: this.route.parent?.snapshot.params[ 'id' ],
      level: 0,
      father: null,
      body: commentBody
    }).then(confirm => {
      this.formMessage = confirm ? 'CONFIRM' : 'No se pudo crear'
    })
  }


  createComment = (comment: Comment): Promise<boolean> =>
    this.Comments.create(comment).then(res => res.data).then(data => {

      if (!data) return false

      switch (data?.level) {
        case 0: this.comments.unshift(data); break
        case 1: this.comments.find(elm => elm.id == data.father)?.comments?.unshift(data); break
      }

      return true
    })
}
