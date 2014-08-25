var Common = require('./Common');


var BLACK = 'black';
var RED   = 'red';

// Balancer
// ---------------

function Balancer(tree) {
    this.tree = tree;
};

Balancer.prototype.inserted = function(node) {
    this.insertCase1(node);
};

Balancer.prototype.deleted = function(node) {
    this.deleteCase1(node);
};

Balancer.prototype.replaceNode = function(original, replacement) {
    if (original.parent === null) {
        this.tree.root = replacement;
    } else {
        if (original === original.parent.left) {
            original.parent.left = replacement;
        } else {
            original.parent.right = replacement;
        }
    }
    
    if (replacement !== null) {
        replacement.parent = original.parent;
    }
};

Balancer.prototype.rotateLeft = function(node) {
    var right = node.right;
    this.replaceNode(node, right);
    
    // Update pointers
    node.right = right.left;
    if (right.left !== null) right.left.parent = node;
    right.left = node;
    node.parent = right;
};

Balancer.prototype.rotateRight = function(node) {
    var left = node.left;
    this.replaceNode(node, left);
    
    // Update pointers
    node.left = left.right;
    if (left.right !== null) left.right.parent = node;
    left.right = node;
    node.parent = left;
};

Balancer.prototype.insertCase1 = function(node) {
    if (node.parent === null) {
        node.color = BLACK;
    } else {
        this.insertCase2(node);
    }
};

Balancer.prototype.insertCase2 = function(node) {
    if (Common.nodeColor(node.parent) === BLACK) {
        return;
    } else {
        this.insertCase3(node);
    }
};

Balancer.prototype.insertCase3 = function(node) {
    var uncle = node.uncle();
    var grandparent = node.grandparent();
    
    if (uncle !== null && Common.nodeColor(uncle) === RED) {
        node.parent.color = BLACK;
        uncle.color = BLACK;
        grandparent.color = RED;
        this.insertCase1(grandparent);
    } else {
        this.insertCase4(node);
    }
};

Balancer.prototype.insertCase4 = function(node) {
    var grandparent = node.grandparent();

    if (node === node.parent.right && node.parent === grandparent.left) {
        this.rotateLeft(node.parent);
        node = node.left;
    } else if (node === node.parent.left && node.parent === grandparent.right) {
        this.rotateRight(node.parent);
        node = node.right;
    }
    
    this.insertCase5(node);
};

Balancer.prototype.insertCase5 = function(node) {
    var grandparent = node.grandparent();
    
    node.parent.color = BLACK;
    grandparent.color = RED;
    
    if (node === node.parent.left && node.parent === grandparent.left) {
        this.rotateRight(grandparent);
    } else if (node === node.parent.right && node.parent === grandparent.right) {
        this.rotateLeft(grandparent);
    }
};

Balancer.prototype.deleteCase1 = function(node) {
    if (node.parent !== null) this.deleteCase2(node);
};

Balancer.prototype.deleteCase2 = function(node) {
    var sibling = node.sibling();
    
    if (Common.nodeColor(sibling) === RED) {
        node.parent.color = RED;
        sibling.color = BLACK;
        if (node === node.parent.left) {
            this.rotateLeft(node.parent);
        } else {
            this.rotateRight(node.parent);
        }
    }
    
    this.deleteCase3(node);
};

Balancer.prototype.deleteCase3 = function(node) {
    var sibling = node.sibling();
    
    if (Common.nodeColor(node.parent) === BLACK &&
        Common.nodeColor(sibling) === BLACK &&
        Common.nodeColor(sibling.left) === BLACK &&
        Common.nodeColor(sibling.right) === BLACK) {
        
        sibling.color = RED;
        this.deleteCase1(node.parent);
    } else {
        this.deleteCase4(node);
    }
};

Balancer.prototype.deleteCase4 = function(node) {
    var sibling = node.sibling();
    
    if (Common.nodeColor(node.parent) === RED &&
        Common.nodeColor(sibling) === BLACK &&
        Common.nodeColor(sibling.left) === BLACK &&
        Common.nodeColor(sibling.right) === BLACK) {
        
        sibling.color = RED;
        node.parent.color = BLACK;
    } else {
        this.deleteCase5(node);
    }
};

Balancer.prototype.deleteCase5 = function(node) {
    var sibling = node.sibling();
    
    if (node === node.parent.left &&
        Common.nodeColor(sibling) === BLACK &&
        Common.nodeColor(sibling.left) === RED &&
        Common.nodeColor(sibling.right) === BLACK) {
        
        sibling.color = RED;
        sibling.left.color = BLACK;
        this.rotateRight(sibling);
    } else if (node === node.parent.right &&
        Common.nodeColor(sibling) === BLACK &&
        Common.nodeColor(sibling.right) === RED &&
        Common.nodeColor(sibling.left) === BLACK) {
        
        sibling.color = RED;
        sibling.right.color = BLACK;
        this.rotateLeft(sibling);
    }
    
    this.deleteCase6(node);
};

Balancer.prototype.deleteCase6 = function(node) {
    var sibling = node.sibling();
    
    sibling.color = Common.nodeColor(node.parent);
    node.parent.color = BLACK;
    
    if (node === node.parent.left) {
        sibling.right.color = BLACK;
        this.rotateLeft(node.parent);
    } else {
        sibling.left.color = BLACK;
        this.rotateRight(node.parent);
    }
};

exports.Balancer = Balancer;
