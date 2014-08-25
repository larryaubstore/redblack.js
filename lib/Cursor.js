
// Cursor
// ---------------

function Cursor(tree, start, end) {
    this.tree = tree;
    this.start = start;
    this.end = end;
    
    var self = this;
    this.walk = function walk(node, iterator) {
        if (node === null) return;
        
        if (start !== undefined && node.key < start) {
            walk(node.right, iterator);
        } else if (end !== undefined && node.key > end) {
            walk(node.left, iterator);
        } else {
            walk(node.left, iterator);
            iterator(node.value, node.key, self.tree);
            walk(node.right, iterator);
        }
    };
};


Cursor.prototype.forEach = function(iterator) {
    this.walk(this.tree.root, iterator);
};

Cursor.prototype.map = function(iterator) {
    var results = [];
    
    this.forEach(function(value, key, tree) {
        results.push(iterator(value, key, tree));
    });
    
    return results;
};



exports.Cursor = Cursor;

