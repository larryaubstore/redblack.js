var Node  = require('./lib/Node').Node;
var Prune = require('./lib/Prune').Prune;
var Tree  = require('./lib/Tree').Tree;


(function() {


    Array.prototype.remove = function() {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };

    
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
    
    redblack.tree = function(limit, callback) {
        return new Tree(limit, callback);
    };
    
    var BLACK = redblack.BLACK = 'black';
    var RED = redblack.RED = 'red';
    
    
    
    
    
})();
