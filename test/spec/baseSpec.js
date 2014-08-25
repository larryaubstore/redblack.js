var redblack = require('../../redblack');
var Node = require('../../lib/Node').Node;


describe("Basic test", function () {

  it("create tree", function () {
    var tree = redblack.tree();
    expect(tree).toBeDefined();
  });


  it('create node', function () {
    var node = new Node("key", "value");
    expect(node).toBeDefined();
  });

  it("Cursor", function () {

    var tree = redblack.tree();

    tree.insert(50, "test");
    tree.insert(6, "test");
    tree.insert(98, "test");
    tree.insert(2, "test");
    tree.insert(76, "test");
    tree.insert(55, "test");

    /*
     *              50
     *             /  \
     *            /    \
     *           6     76
     *          /     /  \
     *         2     55  98
     */

    var i = 0;


    var anode = tree.getnode(76);

    expect(anode).not.toBeUndefined();

    expect(anode.parent.key).toEqual(50);
    expect(anode.left.key).toEqual(55);
    expect(anode.right.key).toEqual(98);

    expect(tree.root.key).toEqual(50);
    expect(tree.root.left.key).toEqual(6);
    expect(tree.root.right.key).toEqual(76);
    expect(tree.root.right.left.key).toEqual(55);
    expect(tree.root.right.right.key).toEqual(98);



    tree.range(76).forEach(function(value, key) {
      i++;
    });

    waitsFor(function () {
      // 76 and 98
      return i == 2;
    }, "Should have 2 nodes", 1500);


    runs(function () {
      i = 0;
      tree.range(50).forEach(function(value, key) {
        i++;
      });
    });

    waitsFor(function () {
      // 50, 55, 76, 98
      return i == 4;
    }, "Should have 4 nodes", 1500);

    runs(function () {
      i = 0;
      tree.range(undefined, 51).forEach(function(value, key) {
        i++;
      });
    });

    waitsFor(function () {
      // 50, 6, 2
      return i == 3;
    }, "Should have 3 nodes", 1500);
  });

});
