import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {Post} from "../data-source/post";

@Component({
  selector: 'app-post-form',
  template: `
    <h4 class="title_one_line">Post: <i>{{title}}</i></h4>
    <form (submit)="onSavePost()" (keyup)="touched = true">
      <div class="form-group">
        <label for="title-input">title:</label>
        <input [(ngModel)]="post.title" id="title-input" name="title-input" type="text" class="form-control">
      </div>

      <div class="form-group">
        <label for="body-input">body:</label>
        <input [(ngModel)]="post.body" id="body-input" name="body-input" type="text" class="form-control">
      </div>

      <button type="submit" class="btn btn-primary" [disabled]="!touched">Save</button>
    </form>
  `
})

export class PostFormComponent implements OnChanges {

  @Input() post: Post;
  @Output() savePost = new EventEmitter<Post>();

  touched = false;
  title: string;

  ngOnChanges() {
    this.title = this.post.title;
  }

  onSavePost() {
    this.savePost.emit(this.post);
    this.touched = false;
    this.title = this.post.title;
  }
}
