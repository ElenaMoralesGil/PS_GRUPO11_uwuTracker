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
  protected comments: { comment: Comment, message: string }[] = []
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

        const level0: { comment: Comment, message: string }[] = [], level1: Comment[] = []
        data.forEach(elm => {
          switch (elm.level) {
            case 1: level1.push(elm); break
            case 0:
              elm.comments = []
              level0.push({ comment: elm, message: "" })
              break
          }
        })

        this.comments = level0
        level1.forEach(elm => this.comments.find(elm_ => elm_.comment.id == elm.father)?.comment.comments?.push(elm))
      })
  }

  onFormClicked() {
    this.formMessage = 'NONE'
  }


  async commentFromForm({ commentBody, updateId }: { commentBody: string, updateId?: string }) {

    const user = await this.loggedInUser.toPromise()

    if (!user) {
      this.formMessage = 'No estas logueado'
      return false
    }

    return this.createComment({
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


  commentListHandler = ({ comment, updateId }: { comment: any, updateId?: string }) => {
    return updateId ? this.updateComment({ id: updateId, data: comment })
      : this.createComment(comment)
  }


  createComment = async (comment: Comment): Promise<boolean> => {

    const user = await this.loggedInUser.toPromise()

    if (!user) {
      this.formMessage = 'No estas logueado'
      return false
    }

    return this.Comments.create({
      ...comment,
      userId: (<User>user).id,
      username: (<User>user).username,
      contentId: this.route.parent?.snapshot.params[ 'id' ],
    }).then(res => res.data).then(data => {

      if (!data) return false

      switch (data?.level) {
        case 0: this.comments.unshift({ comment: { ...data, comments: [] }, message: "" }); break
        case 1:
          const index = this.comments.findIndex(elm => elm.comment.id == data.father)
          if (index > -1) this.comments[ index ].message = "CONFIRM"
          this.comments[ index ].comment.comments?.unshift(data);
          this.comments[ index ] = { ...this.comments[ index ] }
          break
      }

      return true
    })
  }


  updateComment = ({ id, data }: { id: string, data: any }) => {
    this.Comments.update(id, data).then(res => {
      if (res.code !== 200) return false

      for (let i = 0; i < this.comments.length; i++) {
        if (this.comments[ i ].comment.id == id) {
          this.comments[ i ] = { ...this.comments[ i ], ...data }
          return true
        }

        if (this.comments[ i ].comment.comments && (<Comment[]>this.comments[ i ].comment.comments).length > 0) {
          for (let j = 0; j < (<Comment[]>this.comments[ i ].comment.comments).length; j++) {
            if ((<Comment[]>this.comments[ i ].comment.comments)[ j ].id == id) {
              (<Comment[]>this.comments[ i ].comment.comments)[ j ] = { ... (<Comment[]>this.comments[ i ].comment.comments)[ j ], ...data }
              return true
            }
          }
        }
      }

      return false
    })
  }
}
