// Helpers
// ---------------
var BLACK   =  'black';
var RED     =  'red';

exports.nodeColor = function(node) {
  return node === null ? BLACK : node.color;
};

exports.find = function(node, key) {
  while (node != null) {
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


exports.BLACK   =  BLACK;
exports.RED     =  RED;



