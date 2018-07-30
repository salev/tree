import {ISlvLeaf, Leaf} from "./leaf";

export interface ILeafHandle {
  parent: ILeafHandle;
  indexes: Array<number>; // path to a leaf in a tree on levels
  selected: boolean;
  visited: boolean;
}


interface ISlvTree {
  items: Array<ISlvLeaf>;
  onClick: Function;
}

export class Tree implements ISlvTree {

  treeData = [];
  selectedLeaf: Leaf = null;

  // hint: bind callback to component context (this)
  constructor(private clickCallback: {(data: Object, isVisited: boolean, leaf: Leaf)}) {}


  // ISlvTree's field
  get items() {
    return this.treeData;
  }

  onClick(leaf) {
    this.selectLeaf(leaf);
    this.clickCallback(leaf.data, leaf.visited, leaf);
    leaf.visited = true;
  }


  insertLeaves(leaves: Array<Leaf> | Leaf, parent: Leaf = null): void {

    // Note: NEED TO BUILD NEW OBJECT (REFERENCE) TO REDRAW(!!!) IT BY ANGULAR!!!
    // AFTER THAT NEW DOM WILL BE BUILT!!!
    // this.treeData = this.treeData.slice(0);
    
    // 1. add back link to a parent leaf and indexes of path to the leaf
    const initTreeLeaf = (leaf: Leaf, idx: number) => {
      if (parent) {
        leaf.parent = parent;
        leaf.indexes = parent.indexes.slice();
        leaf.indexes.push(idx);
      }
      else {
        leaf.indexes = [idx];
      }
    };

    if (leaves instanceof Leaf) {
      initTreeLeaf(leaves, 0);
    }
    else {
      (leaves as Array<Leaf>).forEach((leaf, idx) => initTreeLeaf(leaf, idx));
    }

    // 2. bind parent leaf with new provided children.
    // N-th level of leaves
    if (parent) {
      if (!parent.children) {
        parent.children = [];
      }
      parent.children = parent.children.concat(leaves);
    }
    // 1st level of leaves
    // Note: allows to append 1st level branches and to have it several
    else {
      this.treeData = this.treeData.concat(leaves);
    }

  }

  getSelectedLeafData() {
    const selLeaf = this.getSelectedLeaf();
    return selLeaf ? selLeaf.getData() : null;
  }

  setSelectedLeafData(data: any) {
    const selLeaf = this.getSelectedLeaf();
    if (!selLeaf) {
      return;
    }
    selLeaf.setData(data);
  }

  // indexes is path to a leaf
  getLeaf(indexes) {
    let leaf = this.treeData[indexes[0]];
    for (let i = 1, len = indexes.length; i < len; i++) {
      leaf = leaf.children[indexes[i]];
    }
    return leaf;
  }

  selectLeaf(leaf: Leaf) {
    if (this.selectedLeaf) {
      this.selectedLeaf.selected = false;
    }

    this.selectedLeaf = leaf;
    this.selectedLeaf.selected = true;
  }

  getSelectedLeaf() {
    return this.selectedLeaf;
  }

  getLeafPath(leaf) {
    const path = [];
    path.push(leaf.name);
    while (leaf.parent) {
      leaf = leaf.parent;
      path.push(leaf.name);
    }
    return path.reverse();
  }

  getSelectedLeafPath() {
    if (!this.selectedLeaf) {
      return '';
    }
    return this.getLeafPath(this.selectedLeaf);
  }
}
