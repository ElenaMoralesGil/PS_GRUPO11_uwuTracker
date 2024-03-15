import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
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
    // Obtenemos el valor del textarea y lo asignamos a newComment
    this.newComment = event.target.value;
  }
  
}
