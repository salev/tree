# Tree View Control (Angular 5)

### [Demo](https://salev.github.io/angular/slv-tree/)

The __Tree View Control__ represents structured data as a tree. All data is downloaded with help of Ajax requests.

1. Import __TreeModule__ into your module to start using of the control.

2. Build a tree data object in a component class. It takes 3 simple steps:

- build a Tree object
```js
const treeObj = new Tree(click_callback_function) // need to bind "this" to the callback
```
- build a set of leaves
```js
new Leaf(name, data_object, is_branch, optional_fa_icon)
```
- inseart leaves into the tree
```js
treeObj.insertLeaves(leaves_array, parent_leaf) // omit parent_leaf parameter for root
```

Then repeat creation of leaves with previously created leaf (branch) as a parent leaf.

3. Inseart the component in a template

```html
<slv-tree [items]="treeObj.items" (change)="treeObj.onClick($event)"></slv-tree>
```

_This project is licensed under the terms of the MIT license._
