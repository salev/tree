import {ILeafHandle, Tree} from "./tree";

/**
 * ISlvLeaf
 */
export interface ISlvLeaf {
  content: string; // example: <span>Child</span>
  expanded: boolean;
  children?: Array<ISlvLeaf>;
}


/**
 * Leaf
 */
export class Leaf implements ISlvLeaf, ILeafHandle {

  // ISlvLeaf's fields
  content;
  expanded = false;
  children: Array<Leaf> = null;

  // ILeafHandle's fields. Initiated in insertLeaves of Tree
  parent: Leaf = null;
  indexes: Array<number> = null; // path to a leaf in a tree
  selected = false;
  visited = false;

  labelFieldName: string = null;

  constructor(labelOrFieldName: string, private data: Object, isParent?: boolean, icon?: string) {
    // A lief with / without children displayed differently.
    if (isParent) {
      this.children = new Array<Leaf>();
    }

    let content = '';
    if (icon) {
      content = `<i class='fa fa-fw fa-lg ${icon}'></i>&nbsp;`;
    }

    if (typeof data[labelOrFieldName] !== 'undefined') {
      content += data[labelOrFieldName];
      this.labelFieldName = labelOrFieldName;
    }
    else {
      content += labelOrFieldName;
    }

    this.content = content;
  }

  isEmpty() {
    return this.children.length === 0;
  }

  isParent() {
    return typeof this.children === 'object';
  }

  isOpen() {
    return this.expanded;
  }

  getLevel() {
    return this.indexes.length - 1;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    if (this.labelFieldName) {
      this.content = this.content.replace(this.data[this.labelFieldName], data[this.labelFieldName]);
      // this.content = data[this.labelFieldName];
    }
    Object.assign(this.data, data);
  }

  getIndexesString() {
    return this.indexes.join(',');
  }
}
