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
    expression = expression.trim();
    parentIndex++;
    let parent = parentIndex;
    // if no + or - sign can be found, take the first available * or / sign
    let firstMultiplicationOperandIndex = -1;
    let firstDivisionOperandIndex = -1;
    let leftParentisis = 0;
    let rightParentisis = 0;

    // See if the overall expression is encapsulated by parentisis
    // ((2 + 4) + 5) is encapsulated while (2 + 4) - (3 + 2) is not
    // (2 + 4)
    // ((2 + 4) - 3) + 4 is not
    if (expression[0] === "(" && expression[expression.length - 1] === ")") {
        for (let i = 0; i < expression.length; i++) {
            if (expression[i] == "(") {
                leftParentisis++;
            }
            if (expression[i] == ")") {
                rightParentisis++;
            }

            if (leftParentisis === rightParentisis && i != expression.length - 1) {
                break;   
            }

            if (i = expression.length - 1) {
                expression = expression.substring(1, expression.length - 1);
            }
        }
    }

    leftParentisis = 0;
    rightParentisis = 0;

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

// account better for subtraction

evaluateExpression("((2 * 3) - 2 + 5)");
console.dir(expressionTree.root, {depth: null});