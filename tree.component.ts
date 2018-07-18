import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'slv-tree',
  styleUrls: ['./tree.scss'],
  template: `
    <div class="sa-tree-view tree">
      <ul>
        <ng-container *ngTemplateOutlet="branch; context: {items: items}"></ng-container>
      </ul>
    </div>

    <!-- branch -->
    <ng-template let-items="items" #branch>
      <ng-container *ngFor="let item of items">
        <ng-container *ngTemplateOutlet="leaf; context: {item: item}"></ng-container>
      </ng-container>
    </ng-template>
    
    <!-- leaf -->
    <ng-template let-item="item" #leaf>
      <li [class.parent_li]="item?.children" [class.selected]="item?.selected">
        <span (click)="onClick(item)" [innerHtml]="item?.content"></span>
        <ul *ngIf="item?.children" [class.hidden]="!item.expanded">
          <ng-container *ngTemplateOutlet="branch; context: {items: item.children}"></ng-container>
        </ul>
      </li>
    </ng-template>
  `

})

export class LvTreeComponent {
  @Input() items: Object[];
  @Output() change = new EventEmitter<any>();

  onClick(item) {
    item.expanded = !item.expanded;
    this.change.emit(item);
  }

}

