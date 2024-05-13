import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import Comment from '../../../schemas/Comment.schema';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent implements OnInit, OnChanges {

  newComment: string = '';

  @Output() commentTxt = new EventEmitter<{ commentBody: string, updateId?: string }>();
  @Output() cancelEvent = new EventEmitter<boolean>();
  @Input() message?: 'NONE' | 'CONFIRM' | string
  @Input() initialComment?: Comment
  @Input() showCancel: boolean = false


  ngOnInit(): void {
    if (this.initialComment) this.newComment = this.initialComment.body
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.message === 'CONFIRM') this.newComment = ''
  }

  addComment(event: Event): void {
    event.preventDefault()
    if (this.newComment.length == 0) {
      this.message = "Can't add an empy comment"
      return
    }
    if (this.newComment.split(' ').length > 150) {
      this.message = "Comments cannot contain more than 150 characters"
      return
    }
    this.commentTxt.emit({ commentBody: this.newComment, updateId: this.initialComment?.id })
  }

  onCommentInput(event: any) {
    this.newComment = event.target.value;
  }

  cancel(event: Event) {
    event.preventDefault()
    this.cancelEvent.emit(true)
  }


  emptyMessage() {
    this.message = ""
  }
}
