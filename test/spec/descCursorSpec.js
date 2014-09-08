var Node        = require('../../lib/Node').Node;
var Prune       = require('../../lib/Prune').Prune;
var Tree        = require('../../lib/Tree').Tree;
var DescCursor  = require('../../lib/DescCursor').DescCursor;



describe("DescCursor", function () {

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

    var descelement = tree.desc();

    expect(descelement).toBeDefined();
    expect(descelement.length).toEqual(7);

    expect(descelement[0]).toEqual(100);
    expect(descelement[1]).toEqual(98);
    expect(descelement[2]).toEqual(76);
    expect(descelement[3]).toEqual(55);
    expect(descelement[4]).toEqual(50);
    expect(descelement[5]).toEqual(6);
    expect(descelement[6]).toEqual(2);
  });

  it("desc limit", function () {


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

    debugger;
    var descelement = tree.desc(4);

    expect(descelement).toBeDefined();

    expect(descelement[0]).toEqual(100);
    expect(descelement[1]).toEqual(98);
    expect(descelement[2]).toEqual(76);
    expect(descelement[3]).toEqual(55);
    
    expect(descelement.length).toEqual(4);
  });

  it("desc limit #2", function () {


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

    var descelement = tree.desc(5);

    expect(descelement).toBeDefined();

    expect(descelement[0]).toEqual(100);
    expect(descelement[1]).toEqual(98);
    expect(descelement[2]).toEqual(76);
    expect(descelement[3]).toEqual(55);
    expect(descelement[4]).toEqual(50);
    
    expect(descelement.length).toEqual(5);
  });

  it("desc limit #3", function () {


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

    var descelement = tree.desc(2);

    expect(descelement).toBeDefined();

    expect(descelement[0]).toEqual(100);
    expect(descelement[1]).toEqual(98);
    
    expect(descelement.length).toEqual(2);
  });

});
