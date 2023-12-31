"use strict"

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
    constructor(root = null) {
        this.root = root;
    }

    *PreOrderTraversal(node = this.root) {
        yield node;
        if (node.left !== null) yield* this.PreOrderTraversal(node.left);
        if (node.right !== null) yield* this.PreOrderTraversal(node.right);
    }

    find(key) {
        // Might be a bit ineffective, but works for this purpose
        for (let node in this.PreOrderTraversal()) {
            if (node.key === key) {
                return node;
            }
        }
        return undefined;
    }

    insert(parent, key, value) {
        parentNode = this.find(parent);
        if (parentNode.left === null) {
            parentNode.left = TreeNode(key, value, parentNode)
            return true;
        }
        if (parentNode.right === null) {
            parentNode.right = TreeNode(key, value, parentNode)
            return true;
        }
        return false;
    }
}

// ((2 * (3 +5)) / 7 + 9) * 7 - 6 + (3 - 2 * 4)
// 2 * 3 * 4
// 2 / 3 + 4 + 2 * 3 + 4

// Go through till you find a + or -, this will be the last value evaluated
// (2 + 3 * 4) if the entire expression is encapsulated in (), remove them.
// ( ) can be seen as it's own constant that will be further splitted later
// if + and - cannot be found, look for multiplication then division

// ((2 * (3 + 5)) / 7 + 9) * 7 - 6 + (3 - 2 * 4)