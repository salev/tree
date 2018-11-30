# Tree View Control (Angular 5)

### [Demo](https://salev.github.io/angular/slv-tree/)

The __Tree View Control__ represents structured data as a tree. All data is downloaded with help of Ajax requests.

Import __TreeModule__ into your (app) module to start using of the control.

It takes 3 simple steps:

- build a Tree object
```js
new Tree(click_callback_function)
```
- build a set of leaves
```js
new Leaf(name, data_object, is_branch, optional_fa_icon)
```
- inseart leaves into the tree
```js
tree_object.insertLeaves(leaves_set, parent_leaf)
```

Then repeat creation of leaves with previously created leaf (branch) as a parent leaf.


_This project is licensed under the terms of the MIT license._
