import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {


  newComment: string = '';
  comments: { text: string }[] = [];

  addComment() {
    this.comments.push({ text: this.newComment });
    this.newComment = '';
  }


  onCommentInput(event: any) {
    this.newComment = event.target.value;
  }
  
}
