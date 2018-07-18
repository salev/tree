import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms"
import {NgModule} from '@angular/core';
import {PostFormComponent} from "./post-form.component";
import {CommentFormComponent} from "./comment-form.component";
import {TreeModule} from "../../tree/tree.module";
import {UserFormComponent} from "./user-form.component";
import {TreePageComponent} from "./tree-page.component";


@NgModule({
 imports: [CommonModule, FormsModule, TreeModule],
 exports: [TreePageComponent],
 declarations: [TreePageComponent, UserFormComponent, PostFormComponent, CommentFormComponent]
})
export class TreePageModule { }
