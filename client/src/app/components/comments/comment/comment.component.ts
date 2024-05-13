import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import Comment from '../../../schemas/Comment.schema';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import User from '../../../schemas/User.schema';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CommentFormComponent } from "../comment-form/comment-form.component";


@Component({
  selector: 'app-comment',
  standalone: true,
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
  imports: [ CommonModule, RouterLink, AsyncPipe, CommentFormComponent ]
})
export class CommentComponent implements OnChanges {
  @Input({ required: true }) comment!: { comment: Comment, message: string }
  @Output() commentHandler = new EventEmitter<{ commentBody: any, updateId?: string }>()

  protected loggedInUser: Observable<User | null>
  protected mode: 'show' | 'edit' | 'create' = 'show'

  constructor(Auth: AuthService) {
    this.loggedInUser = Auth.user
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.comment.message == 'CONFIRM') this.mode = 'show'
  }

  formHandler = ({ commentBody, updateId }: { commentBody: string, updateId?: string }) => {
    if (updateId) {
      this.commentHandler.emit({ commentBody, updateId })
    } else {
      this.commentHandler.emit({ commentBody: { father: this.comment.comment.id, level: 1, body: commentBody } })
    }
  }

  createButton(e: Event) {
    this.mode = 'create'
  }

  editButton(e: Event) {
    this.mode = 'edit'
  }

  cancel() {
    this.mode = 'show'
  }
}
