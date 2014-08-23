var cursor = require('./lib/cursor');

(function() {
    
    var redblack = {};
    var root = this;
    var orig = root.redblack;
    
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = redblack;
    } else {
        root.redblack = redblack;
    }
    
    redblack.VERSION = '0.1.2';
    
    redblack.noConflict = function() {
        root.redblack = orig;
        return redblack;
    };
    
    redblack.tree = function() {
        return new Tree();
    };
    
    var BLACK = redblack.BLACK = 'black';
    var RED = redblack.RED = 'red';
    
    // Node
    // ---------------
    
    function Node(key, value) {
        this.key = key;
        this.value = value;
        this.color = RED;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.count = 1;
        this.average = 0;
    };
    
    Node.prototype.grandparent = function() {
        if (this.parent === null) return null;
        return this.parent.parent;
    };
    
    Node.prototype.sibling = function() {
        if (this.parent === null) return null;
        return this === this.parent.left ? this.parent.right : this.parent.left;
    };
    
    Node.prototype.uncle = function() {
        if (this.parent === null) return null;
        return this.parent.sibling();
    };
    
    
    function Tree() {
        this.root = null;
        this.balancer = new Balancer(this);
    };
    
    Tree.prototype.get = function(key) {
        var node = find(this.root, key);
        return node === null ? null : node.value;
    };

    Tree.prototype.getnode = function(key) {
        var node = find(this.root, key);
        return node === null ? null : node;
    };
   
    Tree.prototype.insert = function(key, value) {
        var newNode = new Node(key, value);
        
        if (this.root === null) {
            this.root = newNode;
        } else {
            var node = this.root;
            
            while (true) {
                node.count = node.count + 1;
                if (key < node.key) {
                    if (node.left === null) {
                        node.left = newNode;
                        break;
                    } else {
                        node = node.left;
                    }
                } else if (key > node.key) {
                    if (node.right === null) {
                        node.right = newNode;
                        break;
                    } else {
                        node = node.right;
                    }
                } else {
                    node.value = value;
                    return;
                }
            }
            
            newNode.parent = node;
        }
        
        this.balancer.inserted(newNode);
    };
    
    Tree.prototype.delete = function(key) {
        var node = find(this.root, key);
        if (node === null) return;

        // Decrement count 
        find(this.root, key, true);

        if (node.left !== null && node.right !== null) {
            var pred = node.left;
            while (pred.right !== null) pred = pred.right;
            
            node.key = pred.key;
            node.value = pred.value;
            node = pred;
        }
        
        var child = (node.right === null) ? node.left : node.right;
        if (nodeColor(node) === BLACK) {
            node.color = nodeColor(child);
            this.balancer.deleted(node);
        }
        
        this.balancer.replaceNode(node, child);
        
        if (nodeColor(this.root) === RED) {
            this.root.color = BLACK;
        }
    };

    Tree.prototype.prune = function(start) {
      //var prunecursor = new PruneCursor(start);
      //prunecursor.walk(this.root);

      var heightcursor = new cursor.HeightCursor(start);
      var blackheight = heightcursor.walk(this.root, 0);

      var prunecursor = new cursor.PruneCursor(blackheight);
      prunocursor.walk(this.root);
    };
    
    Tree.prototype.range = function(start, end) {
        return new cursor.Cursor(this, start, end);
    };

    
    // Proxy cursor methods
//    for (var method in Cursor.prototype) {
//        if (Cursor.prototype.hasOwnProperty(method)) {
//            var func = Cursor.prototype[method];
//            Tree.prototype[method] = function() {
//                var cursor = new Cursor(this);
//                return func.apply(cursor, arguments);
//            };
//        }
//    }
    
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


        /*      x                 y
         *     / \               / \
         *    a   y      ==>    x   c
         *       / \           / \
         *      b   c         a   b

         *    node is x
         *    y is node.right
         *    a is node.left
         *    b is right.left
         *    c is right.right
         *
         *    node = node + b
         *    right = right - b 
         */


        var a = node.left;
        var b = right.left;
        var c = right.right;

        if(node !== null && b !== null) {
          node.count = node.count + b.count;
        }

        if(right !== null && b !== null) {
          right.count = right.count - b.count - 1;
        }   
        
        // Update pointers
        node.right = right.left;
        if (right.left !== null) right.left.parent = node;
        right.left = node;
        node.parent = right;
    };
    
    Balancer.prototype.rotateRight = function(node) {

        var left = node.left;
        this.replaceNode(node, left);


        /*        y              x 
         *       / \            / \
         *      x   c    ==>   a   y
         *     / \                / \
         *    a   b              b   c
         *
         *   node is            y
         *   node.left is       x
         *   node.left.left is  a
         *   node.left.right is b
         *   node.right is      c
         *
         *   a is left.left
         *   b is left.right
         *   c is node.right

         *   left = left + c
         *   node = node - a
         */

        var a = left.left;
        var b = left.right;
        var c = node.right;

        // y = y + b
        if(node !== null && b !== null) {
          node.count = node.count + b.count;
        }

        // y = y - x
        if(node !== null && node.left !== null) {
          node.count = node.count - node.left.count; 
        }

        // x = x - b
        if(left !== null && b !== null) {
          left.count = left.count - b.count;
        } 

        // x = x + y
        if(left != null && node != null) {
          left.count = left.count + node.count;
        }

        
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
        if (nodeColor(node.parent) === BLACK) {
            return;
        } else {
            this.insertCase3(node);
        }
    };
    
    Balancer.prototype.insertCase3 = function(node) {
        var uncle = node.uncle();
        var grandparent = node.grandparent();
        
        if (uncle !== null && nodeColor(uncle) === RED) {
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
        
        if (nodeColor(sibling) === RED) {
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
        
        if (nodeColor(node.parent) === BLACK &&
            nodeColor(sibling) === BLACK &&
            nodeColor(sibling.left) === BLACK &&
            nodeColor(sibling.right) === BLACK) {
            
            sibling.color = RED;
            this.deleteCase1(node.parent);
        } else {
            this.deleteCase4(node);
        }
    };
    
    Balancer.prototype.deleteCase4 = function(node) {
        var sibling = node.sibling();
        
        if (nodeColor(node.parent) === RED &&
            nodeColor(sibling) === BLACK &&
            nodeColor(sibling.left) === BLACK &&
            nodeColor(sibling.right) === BLACK) {
            
            sibling.color = RED;
            node.parent.color = BLACK;
        } else {
            this.deleteCase5(node);
        }
    };
    
    Balancer.prototype.deleteCase5 = function(node) {
        var sibling = node.sibling();
        
        if (node === node.parent.left &&
            nodeColor(sibling) === BLACK &&
            nodeColor(sibling.left) === RED &&
            nodeColor(sibling.right) === BLACK) {
            
            sibling.color = RED;
            sibling.left.color = BLACK;
            this.rotateRight(sibling);
        } else if (node === node.parent.right &&
            nodeColor(sibling) === BLACK &&
            nodeColor(sibling.right) === RED &&
            nodeColor(sibling.left) === BLACK) {
            
            sibling.color = RED;
            sibling.right.color = BLACK;
            this.rotateLeft(sibling);
        }
        
        this.deleteCase6(node);
    };
    
    Balancer.prototype.deleteCase6 = function(node) {
        var sibling = node.sibling();
        
        sibling.color = nodeColor(node.parent);
        node.parent.color = BLACK;
        
        if (node === node.parent.left) {
            sibling.right.color = BLACK;
            this.rotateLeft(node.parent);
        } else {
            sibling.left.color = BLACK;
            this.rotateRight(node.parent);
        }
    };
    
    // Helpers
    // ---------------
    
    function nodeColor(node) {
        return node === null ? BLACK : node.color;
    };
    
    function find(node, key, decrement) {

        while (node !== null) {
            if(typeof(decrement) !== "undefined") {
              node.count = node.count - 1;
            }

            if (key === node.key) {
                return node;
            } else if (key < node.key) {
                node = node.left;
            } else if (key > node.key) {
                node = node.right;
            }
        }
        
        return node;
    };
    
})();
