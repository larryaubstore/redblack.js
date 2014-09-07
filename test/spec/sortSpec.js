var Node  = require('../../lib/Node').Node;
var Prune = require('../../lib/Prune').Prune;
var Tree  = require('../../lib/Tree').Tree;
var Sort  = require('../../lib/SortCursor').Sort;



describe("Sort", function () {

  it("Basic test", function () {


    var tree = new Tree(10, function(deletedelement) {

    });

    /*
     *              50
     *             /  \
     *            /    \
     *           6     76
     *          /     /  \
     *         2     55  98
     *                    \
     *                    100
     */
    tree.insert(50, "test");
    tree.insert(6, "test");
    tree.insert(98, "test");
    tree.insert(2, "test2");
    tree.insert(76, "test");
    tree.insert(55, "test");
    tree.insert(100, "test");

    var sortedelement = tree.sort();

    expect(sortedelement).toBeDefined();
    expect(sortedelement.length).toEqual(7);

    expect(sortedelement[0]).toEqual(100);
    expect(sortedelement[1]).toEqual(98);
    expect(sortedelement[2]).toEqual(76);
    expect(sortedelement[3]).toEqual(55);
    expect(sortedelement[4]).toEqual(50);
    expect(sortedelement[5]).toEqual(6);
    expect(sortedelement[6]).toEqual(2);
  });
});
