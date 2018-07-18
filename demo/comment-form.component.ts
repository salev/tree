import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {Comment} from "../data-source/comment";

@Component({
  selector: 'app-comment-form',
  template: `
    <h4 class="title_one_line">Comment: <i>{{title}}</i></h4>
    <form (submit)="onSaveComment()" (keyup)="touched = true">
      <div class="form-group">
        <label for="name-input">name:</label>
        <input [(ngModel)]="comment.name" id="name-input" name="name-input" type="text" class="form-control">
      </div>

      <div class="form-group">
        <label for="body-input">body:</label>
        <input [(ngModel)]="comment.body" id="body-input" name="body-input" type="text" class="form-control">
      </div>

      <button type="submit" class="btn btn-primary" [disabled]="!touched">Save</button>
    </form>
  `
})

export class CommentFormComponent implements OnChanges {
  @Input() comment: Comment;
  @Output() saveComment = new EventEmitter<Comment>();

  touched = false;
  title: string;

  ngOnChanges() {
    this.title = this.comment.name;
  }

  onSaveComment() {
    this.saveComment.emit(this.comment);
    this.touched = false;
    this.title = this.comment.name;
  }
}
