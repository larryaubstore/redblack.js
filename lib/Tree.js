var Common   = require('./Common');
var Node     = require("./Node").Node;
var Balancer = require("./Balancer").Balancer;
var Cursor   = require("./Cursor").Cursor;
var Prune    = require("./Prune").Prune;

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// Tree
// ---------------

function Tree(limit, delcallback) {

    if(typeof(limit) !== "undefined") {
      this.limit = limit;
    } else {
      this.limit = null;
    }
    this.delcallback = delcallback;

    this.root = null;
    this.balancer = new Balancer(this);
    this.count = 0;
};

Tree.prototype.get = function(key) {
  if(typeof(key) !== "undefined" && isNumber(key)) {
    var node = Common.find(this.root, key);
    return node === null ? null : node.value;
  } else {
    return null;
  }
};

Tree.prototype.getnode = function(key) {
  if(typeof(key) !== "undefined" && isNumber(key)) {
    var node = Common.find(this.root, key);
    return node === null ? null : node;
  } else {
    return null;
  }
};  

Tree.prototype.insert = function(key, value) {

  if(typeof(key) !== "undefined" 
    && typeof(value) !== "undefined"
    && isNumber(key) == true) {

    
    var newNode = new Node(key, value);
    
    if (this.root === null) {
        this.root = newNode;
    } else {
        var node = this.root;
        while (true) {
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


                var counter = node.value.length - 1;
                var pushvalue = true;
                while(counter >= 0 && pushvalue == true) {
                 
                  if(node.value[counter] == value) {
                    pushvalue = false;
                  }
                  counter--; 
                }        

                if(pushvalue == true) { 
                  this.addelement();
                  node.value.push(value);
                  return true;
                } else {
                  return false;
                }
            }
        }
        
        newNode.parent = node;
    }
    
    this.balancer.inserted(newNode);
    this.addelement();
    return true;
  }
};

Tree.prototype.delete = function(key) {
    
   if(typeof(key) !== "undefined" 
    && isNumber(key) == true) {

      var node = Common.find(this.root, key);
      if (node === null) return;

      var valuetodelete = node.value;

      if (node.left !== null && node.right !== null) {
          var pred = node.left;
          while (pred.right !== null) pred = pred.right;
          
          node.key = pred.key;
          node.value = pred.value;
          node = pred;
      }
      
      var child = (node.right === null) ? node.left : node.right;
      if (Common.nodeColor(node) === Common.BLACK) {
          node.color = Common.nodeColor(child);
          this.balancer.deleted(node);
      }
      
      this.balancer.replaceNode(node, child);
      
      if (Common.nodeColor(this.root) === Common.RED) {
          this.root.color = Common.BLACK;
      }

      this.deleteelement(valuetodelete);
  }
};

Tree.prototype.range = function(start, end) {
    return new Cursor(this, start, end);
};

Tree.prototype.addelement = function () {
  this.count = this.count + 1;
  if(this.count == this.limit) {
    var prunecursor = new Prune(this);
    var deletedelement = prunecursor.prune();
  }
};

Tree.prototype.deleteelement = function (deletedelement) {
  
  this.count = this.count - deletedelement.length;

  if(typeof(this.delcallback) !== "undefined") {
    this.delcallback(deletedelement);
  }

  
};

// Proxy cursor methods
for (var method in Cursor.prototype) {
    if (Cursor.prototype.hasOwnProperty(method)) {
        var func = Cursor.prototype[method];
        Tree.prototype[method] = function() {
            var cursor = new Cursor(this);
            return func.apply(cursor, arguments);
        };
    }
}

exports.Tree = Tree;
