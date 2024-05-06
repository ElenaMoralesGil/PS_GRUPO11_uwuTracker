import { Component } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent {

  newComment: string = '';


  addComment() {
    //this.comments.push({ text: this.newComment });
    this.newComment = '';
  }


  onCommentInput(event: any) {
    this.newComment = event.target.value;
  }
}
