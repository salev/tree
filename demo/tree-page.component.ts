import {Component, OnInit} from '@angular/core';
import "rxjs/add/operator/map";
import {ServerRequestsService} from "../data-source/server-requests.service";
import {Tree} from "../../tree/tree";
import {User} from "../data-source/user";
import {Post} from "../data-source/post";
import {Comment} from "../data-source/comment";
import {Leaf} from "../../tree/leaf";

@Component({
  selector: 'slv-tree-page',
  template: `
    <div class="row">
      <div class="col-md-7">
        <h4>Tree</h4>
        <slv-tree [items]="tree.items" (change)="tree.onClick($event)"></slv-tree>
      </div>
      <div class="col-md-5">
        <p *ngIf="!user && !post && !comment"><br/><br/>Please, select an item (leaf) of the tree.</p>
        <app-user-form
            *ngIf="user"
            [user]="user"
            (saveUser)="saveDataInLeaf($event)">
        </app-user-form>
        <app-post-form
            *ngIf="post"
            [post]="post"
            (savePost)="saveDataInLeaf($event)">
        </app-post-form>
        <app-comment-form
            *ngIf="comment"
            [comment]="comment"
            (saveComment)="saveDataInLeaf($event)">
        </app-comment-form>
      </div>
    </div>
  `,
  providers: [
    ServerRequestsService
  ]
})

export class TreePageComponent implements OnInit {
  tree: Tree;

  user: User = null;
  post: Post = null;
  comment: Comment = null;

  constructor(private reqService: ServerRequestsService) { }

  ngOnInit() {
    this.tree = new Tree(this.onClick.bind(this));
    this.reqService.fetchUsers()
      .map(users => users.map(user => new Leaf('name', new User(user), true, 'fa-user'))
      )
      .subscribe(
        (leaves) => {
          this.tree.insertLeaves(leaves);
        },
        () => alert('error')
      );
  }

  onClick(data: User | Post | Comment, isVisited: boolean, leaf: Leaf) {

    // reset selected objects
    this.user = null;
    this.post = null;
    this.comment = null;

    // 1. User
    if (data instanceof User) {

      this.user = <User>{...data};
      if (!isVisited) {
        this.reqService.fetchPosts(data)
          .map(
            posts => {
              return posts.map(post => new Leaf('title', new Post(post), true, 'fa-edit'));
            }
          )
          .subscribe(
            (leaves) => {
              this.tree.insertLeaves(leaves, leaf);
            },
            () => alert('error')
          );
      }
    }

    // 2. Post
    else if (data instanceof Post) {
      this.post = <Post>{...data};

      if (!isVisited) {
        this.reqService.fetchComments(data)
          .map(
            comments => {
              return comments.map(comment => new Leaf('name', new Comment(comment), false, 'fa-comment'));
            }
          )
          .subscribe(
            (leaves) => {
              this.tree.insertLeaves(leaves, leaf);
            },
            () => alert('error')
          );
      }
    }
    // 3. comment
    else {
      this.comment = <Comment>{...data};
    }
  }

  saveDataInLeaf(data: User | Post | Comment) {
    this.tree.setSelectedLeafData(data);
  }

}
