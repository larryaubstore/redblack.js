var Node  = require('../../lib/Node').Node;
var Prune = require('../../lib/Prune').Prune;
var Tree  = require('../../lib/Tree').Tree;

describe("Prune", function () {


  it("Limit test", function () {

    var cbcalled = false;
    // TO DO
    var tree = new Tree(7, function (deletedelement) {

      expect(deletedelement).toBeDefined();
      expect(deletedelement).toEqual(2);
      cbcalled = true;
      expect(tree.count).toEqual(6);
    });

    tree.insert(50, "test");
    tree.insert(6, "test");
    tree.insert(98, "test");
    tree.insert(2, "test2");
    tree.insert(76, "test");
    tree.insert(55, "test");
    expect(tree.count).toEqual(6);
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
    var tree = new Tree(7, function (deletedkeys, deletedvalues) {

      expect(deletedkeys).toBeDefined();
      expect(deletedkeys).toEqual(2);
      expect(deletedvalues).toEqual(["test2", "test2"]);
      cbcalled = true;
      expect(tree.count).toEqual(5);
    });

    
    tree.insert(50, "test");
    expect(tree.count).toEqual(1);

    tree.insert(6, "test");
    expect(tree.count).toEqual(2);

    tree.insert(98, "test");
    expect(tree.count).toEqual(3);

    tree.insert(2, "test2");
    expect(tree.count).toEqual(4);

    tree.insert(2, "test2");
    expect(tree.count).toEqual(5);

    tree.insert(76, "test");
    expect(tree.count).toEqual(6);

    tree.insert(55, "test");
    expect(tree.count).toEqual(5);

//    tree.insert(100, "test");
//    expect(tree.count).toEqual(6);
    

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
