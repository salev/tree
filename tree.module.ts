import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {LvTreeComponent} from "./tree.component";

@NgModule({
  imports: [CommonModule],
  declarations: [LvTreeComponent],
  exports: [LvTreeComponent]
})
export class LvTreeModule { }
