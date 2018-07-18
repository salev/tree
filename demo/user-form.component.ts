import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from "../data-source/user";

@Component({
  selector: 'app-user-form',
  template: `
    <h4 class="title_one_line">User: <i>{{title}}</i></h4>
    <form #userForm="ngForm" (submit)="onSaveUser()" (keyup)="touched = true">
      <div class="form-group">
        <label for="name-input">name:</label>
        <input [(ngModel)]="user.name" id="name-input" name="name-input" type="text" class="form-control">
      </div>

      <div class="form-group">
        <label for="username-input">username:</label>
        <input [(ngModel)]="user.username" id="username-input" name="username-input" type="text" class="form-control">
      </div>

      <div class="form-group">
        <label for="email-input">email:</label>
        <input [(ngModel)]="user.email" id="email-input" name="email-input" type="text" class="form-control">
      </div>

      <div class="form-group">
        <label for="phone-input">phone:</label>
        <input [(ngModel)]="user.phone" id="phone-input" name="phone-input" type="text" class="form-control">
      </div>

      <div class="form-group">
        <label for="website-input">website:</label>
        <input [(ngModel)]="user.website" id="website-input" name="website-input" type="text" class="form-control">
      </div>

      <button type="submit" class="btn btn-primary" [disabled]="!touched">Save</button>
    </form>
  `
})

export class UserFormComponent implements OnChanges {
  @Input() user: User;
  @Output() saveUser = new EventEmitter<User>();

  touched = false;
  title: string;

  ngOnChanges() {
    this.title = this.user.name;
  }

  onSaveUser() {
    this.saveUser.emit(this.user);
    this.touched = false;
    this.title = this.user.name;
  }
}
