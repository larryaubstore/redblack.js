function Prune(tree) {

  this.tree = tree;
  
  var self = this;
  this.walk = function walk(node) {

    if(node != null) {

      if(node.left != null) {
        return(walk(node.left));
      } else {
        var value = node.value;
        tree.delete(node.key);
        return value; 
      }
    }
  };
}

Prune.prototype.prune = function () {
  return this.walk(this.tree.root);
};



exports.Prune = Prune;

