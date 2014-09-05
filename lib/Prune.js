function Prune(tree) {

  this.tree = tree;
  
  var self = this;
  this.walk = function walk(node) {

    if(node != null) {

      if(node.left != null) {
        return(walk(node.left));
      } else {
        tree.delete(node.key);
        return null;
      }
    }
  };
}

Prune.prototype.prune = function () {
  this.walk(this.tree.root);
};



exports.Prune = Prune;

