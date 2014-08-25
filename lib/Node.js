    var BLACK = 'black';
    var RED   = 'red';


    // Node
    // ---------------
    
    function Node(key, value) {
        this.key = key;
        this.value = [value];
        this.color = RED;
        this.left = null;
        this.right = null;
        this.parent = null;
    };

    Node.prototype.grandparent = function() {
      if(this != null && this.parent != null) {
        return this.parent.parent;
      } else {
        return null;
      }
    };
    
    Node.prototype.sibling = function() {
        if (this.parent === null) return null;
        return this === this.parent.left ? this.parent.right : this.parent.left;
    };
    
    Node.prototype.uncle = function() {
      var grandparent = this.grandparent();
      if(grandparent == null) {
        return null;
      } 

      if(this.parent == grandparent.left) {
        return grandparent.right;
      } else {
        return grandparent.left;
      }
    };

exports.Node = Node;
