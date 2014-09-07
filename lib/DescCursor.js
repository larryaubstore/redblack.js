function DescCursor(tree) {

  this.tree = tree;
  
  var self = this;
  this.walk = function walk(node) {

    if(node != null) {
      if(node.right != null) {
        return(walk(node.right).concat(node.key).concat(walk(node.left)));
      } else if(node.left != null) {
        return([node.key].concat(walk(node.left)));
      }
      return [node.key];
    } else {
      return [];
    } 
  };
}

DescCursor.prototype.desc = function () {
  return(this.walk(this.tree.root));
};



exports.DescCursor = DescCursor;

