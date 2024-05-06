import { Component, Input } from '@angular/core';

import Comment from '../../../schemas/Comment.schema';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import User from '../../../schemas/User.schema';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input({ required: true }) comment!: Comment

  protected loggedInUser: Observable<User | null>

  constructor(Auth: AuthService) {
    this.loggedInUser = Auth.user
  }

  edit = () => {

  }

  addComment = () => {

  }

}
