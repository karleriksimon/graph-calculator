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
        for (let node of this.PreOrderTraversal()) {
            if (node.key === key) {
                return node;
            }
        }
        return undefined;
    }

    insert(parent, key, value) {
        let parentNode = this.find(parent);
        if (parentNode.left === null) {
            parentNode.left = new TreeNode(key, value, parentNode)
            return true;
        }
        if (parentNode.right === null) {
            parentNode.right = new TreeNode(key, value, parentNode)
            return true;
        }
        return false;
    }
}

let expressionTree = new BinaryTree();
let parentIndex = 0;
function evaluateExpression(expression, parentKey) {
    parentIndex++;
    let parent = parentIndex;
    // if no + or - sign can be found, take the first available * or / sign
    let firstMultiplicationOperandIndex = -1;
    let firstDivisionOperandIndex = -1;
    let leftParentisis = 0;
    let rightParentisis = 0;

    for (let i = 0; i < expression.length; i++) {
        let char = expression[i];

        if (char == "(") {
            leftParentisis++;
        }
        if (char == ")") {
            rightParentisis++;
        }
        if (char == "/" && rightParentisis === leftParentisis) {
            firstDivisionOperandIndex = i;
        }
        if (char == "*" && rightParentisis === leftParentisis) {
            firstMultiplicationOperandIndex = i
        }

        if (char == "+" || char == "-") {
            // split if left and right parentisis are
            if (leftParentisis === rightParentisis) {
                // split expression 
                if (expressionTree.root === null) {
                    expressionTree.root = new TreeNode(parentIndex, char, null);
                    evaluateExpression(expression.substring(0, i), parent);
                    evaluateExpression(expression.substring(i + 1, expression.length), parent);
                    return;
                }

                expressionTree.insert(parentKey, parentIndex, char);
                evaluateExpression(expression.substring(0, i), parent);
                evaluateExpression(expression.substring(i + 1, expression.length), parent);
                return;
            }
        }
    }

    // Will reach this part if neither + or - found
    if (firstMultiplicationOperandIndex !== -1) {
        expressionTree.insert(parentKey, parentIndex, "*");
        evaluateExpression(expression.substring(0, firstMultiplicationOperandIndex), parent);
        evaluateExpression(expression.substring(firstMultiplicationOperandIndex + 1, expression.length), parent);       
        return;
    }
    if (firstDivisionOperandIndex !== -1) {
        expressionTree.insert(parentKey, parentIndex, "/");
        evaluateExpression(expression.substring(0, firstDivisionOperandIndex), parent);
        evaluateExpression(expression.substring(firstDivisionOperandIndex + 1, expression.length), parent);  
        return;
    }

    // Will reach this part if neither + - * or / can be found
    expressionTree.insert(parentKey, parentIndex, expression);
}

evaluateExpression("(2 * 3) + 2");

console.dir(expressionTree.root, {depth: null});
// ((2 * (3 +5)) / 7 + 9) * 7 - 6 + (3 - 2 * 4)
// 2 * 3 * 4
// 2 / 3 + 4 + 2 * 3 + 4

// Go through till you find a + or -, this will be the last value evaluated
// (2 + 3 * 4) if the entire expression is encapsulated in (), remove them.
// ( ) can be seen as it's own constant that will be further splitted later
// if + and - cannot be found, look for multiplication then division

// ((2 * (3 + 5)) / 7 + 9) * 7 - 6 + (3 - 2 * 4)