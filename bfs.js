// javascript program for different tree traversals

// Class containing left and right child of current
// node and key value
class Node {
	constructor(val) {
		this.key = val;
		this.left = null;
		this.right = null;
	}
}


	
// Given a binary tree, print its nodes in inorder
function printInorder(node) {
	if (node == null)
		return;

	// First recur on left child */
	printInorder(node.left);

	// Then print the data of node
	console.log(node.key + " ");

	// Now recur on right child
	printInorder(node.right);
}

// Driver method 
	// Root of Binary Tree
    var root = null;
	root = new Node(1);
	root.left = new Node(2);
	root.right = new Node(3);
	root.left.left = new Node(4);
	root.left.right = new Node(5);

	console.log("Inorder traversal of binary tree is ");
	printInorder(root);

// This code is contributed by aashish1995
