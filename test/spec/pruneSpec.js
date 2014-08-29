var Node  = require('../../lib/Node').Node;
var Prune = require('../../lib/Prune').Prune;
var Tree  = require('../../lib/Tree').Tree;

describe("Prune", function () {

  it("Basic test", function () {

    var nodea = new Node("a", "value1");
    var nodeb = new Node("b", "value2");
    var nodec = new Node("c", "value3");


    nodea.left = nodeb;
    nodeb.left = nodec
    var prunecursor = new Prune({root:nodea, delete: function () {}});

    var result = prunecursor.prune();

    expect(result).toEqual(["value3"]);
  });

  it("Limit test", function () {

    var cbcalled = false;
    // TO DO
    var tree = new Tree(7, function (deletedelement) {

      expect(deletedelement).toBeDefined();
      expect(deletedelement).toEqual(["test2"]);
      cbcalled = true;
      expect(tree.count).toEqual(6);
    });

    tree.insert(50, "test");
    tree.insert(6, "test");
    tree.insert(98, "test");
    tree.insert(2, "test2");
    tree.insert(76, "test");
    tree.insert(55, "test");
    tree.insert(100, "test");
    

    /*
     *              50
     *             /  \
     *            /    \
     *           6     76
     *          /     /  \
     *         2     55  98
     */

    waitsFor(function () {
      return cbcalled == true;
    }, "Delete callback never called", 2500);


  });

  it("Limit test with same key ", function () {

    var cbcalled = false;
    // TO DO
    var tree = new Tree(7, function (deletedelement) {

      expect(deletedelement).toBeDefined();
      expect(deletedelement.length).toEqual(1);
      expect(deletedelement[0]).toEqual("test2");
      cbcalled = true;
      expect(tree.count).toEqual(6);
    });

    tree.insert(50, "test");
    tree.insert(6, "test");
    tree.insert(98, "test");
    tree.insert(2, "test2");
    tree.insert(2, "test2");
    tree.insert(76, "test");
    tree.insert(55, "test");
    tree.insert(100, "test");
    

    /*
     *              50
     *             /  \
     *            /    \
     *           6     76
     *          /     /  \
     *         2     55  98
     */

    waitsFor(function () {
      return cbcalled == true;
    }, "Delete callback never called", 2500);


  });
 

});
