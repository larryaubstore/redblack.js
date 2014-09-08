function DescCursor(tree, limit, desclimit) {

  this.tree = tree;
  this.limit = limit; 
  this.desclimit = desclimit;

  var self = this;

  this.notvisited = function(node, visited) {
    var result = true;
    if(node && visited) {
      var counter = visited.length;
      while(counter > 0 && result == true) {
        if(visited[counter] == node) {
          result = false;
        }
        counter--;
      }
    }
    return result;
  }

  this.goright = function(node) {
    var current = node;
    if(node != null) {
      var previous = null;
      while(current != null) {
        previous = current;
        current = current.right;
      }
      current = previous;
    }
    return current;
  }

  this.walk = function walk(node) {
    var result = [];
    var lastmarker = null

    if(node != null) {
      var current = this.goright(node);
      var visited = [];

      while(current != null) {
        var left = current.left;
        result.push(current.key);
        visited.push(current);

        if(left != null ) {
          current = this.goright(left);
          result.push(current.key);
          visited.push(current);

          if(left.left != null ) {
            current = this.goright(left.left);
            result.push(current.key);
            visited.push(current); 
          }
        }

        if(current.parent != null && this.notvisited(current.parent, visited) == true) {
          current = current.parent;
        } else if(current.parent != null && current.parent.parent != null 
          && this.notvisited(current.parent.parent, visited) == true) {
          current = current.parent.parent;
        } else {
          current = null;
        }

        if(typeof(limit) !== "undefined" && result.length >= limit) {
          current = null;
          result = result.slice(0, limit);
        }
      }
    }
    return result;
  };
}

DescCursor.prototype.desc = function () {
  return(this.walk(this.tree.root));
};

exports.DescCursor = DescCursor;
