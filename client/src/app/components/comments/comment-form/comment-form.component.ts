import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent implements OnChanges {
  newComment: string = '';

  @Output() commentTxt = new EventEmitter<string>();
  @Input() message!: 'NONE' | 'CONFIRM' | string

  ngOnChanges(changes: SimpleChanges): void {
    if (this.message === 'CONFIRM') this.newComment = ''
  }

  addComment(event: Event): void {
    event.preventDefault()
    this.commentTxt.emit(this.newComment)
  }

  onCommentInput(event: any) {
    this.newComment = event.target.value;
  }
}
