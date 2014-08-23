var BLACK =  'black';
var RED =  'red';


var HeightCursor = function(start) {

  this.start = start;

  this.walk = function walk(node) {

    var result = 0;
    if (node !== null) {
      if (start !== undefined && node.key <= start) {
        if(node.color == RED) {
          return 0;
        } else {
          if(node.color == BLACK) {
            result = 1;
          }
          return(walk(node.left) + result);
        }
      } else {
        if(node.color == BLACK) {
          result = 1;
        }
        return(walk(node.left) + result);
      }
    }
    return 0;
  };

  this.prune = function(node, height) {
     
    var result = [];
    this.walk = function walk(node, height, heightcounter) {
      if (node !== null) {  
        console.log(node.key);
        if (heightcounter == height && node.color == RED) {
          heightcounter = 0;
          return node;
          
        } else {
          heightcounter = heightcounter + 1;
          return(result.concat(walk(node.left, height, heightcounter)).concat(walk(node.right, height, heightcounter)));
        }
      } else {
        heightcounter = 0;
      }
      return result;
    };

    var nodes =  this.walk(node, height, 0);
    var nodetodelete, parent;

    for(var i = 0; i < nodes.length; i++) {
      nodetodelete = nodes[i];
      parent = nodetodelete.parent;
      parent.count = parent.count - nodetodelete.count;
      if(parent.left == nodetodelete) {
        parent.left = null;
      }

      if(parent.right == nodetodelete) {
        parent.right = null;
      }

      nodetodelete.parent = null;
    }
  };
};





exports.HeightCursor = HeightCursor; 
