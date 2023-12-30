class TreeNode {
    constructor(key, value = key, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    isLeaf() {
        if (this.left === null && this.right === null) return true;
        return false;
    }
}

class BinaryTree {
    constructor(rootNode = null) {
        this.rootNode = rootNode;
    }

    insert(parent, key, value, rightNode = true) {
        // Check whether right/left node is already inserted 
    }
}