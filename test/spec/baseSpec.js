var redblack = require('../../redblack');


describe("Basics tests", function () {


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

      expect(anode.left.key).toEqual(55);
      expect(anode.right.key).toEqual(98);

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

  it("Pruning", function () {

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

      var anode = tree.getnode(50);

      expect(anode).not.toBeUndefined();
      expect(anode.left.key).toEqual(6);
      expect(anode.right.key).toEqual(76);

      tree.prune(76);
      anode = tree.getnode(6);

      expect(anode).not.toBeUndefined();
      expect(anode.left).toEqual(null);
  });

  it("Pruning", function () {

      var tree = redblack.tree();

      tree.insert(50, "test");
      tree.insert(6, "test");
      tree.insert(98, "test");
      tree.insert(2, "test");
      tree.insert(76, "test");
      tree.insert(55, "test");

      var anode = tree.getnode(50);

      expect(anode).not.toBeUndefined();
      expect(anode.left.key).toEqual(6);
      expect(anode.right.key).toEqual(76);

      tree.prune(76);
      anode = tree.getnode(6);

      expect(anode).not.toBeUndefined();
      expect(anode.left).toEqual(null);
  });


  it("Count for delete scenario", function () {
      var tree = redblack.tree();

      tree.insert(50, "test");
      tree.insert(6, "test");
      tree.insert(98, "test");
      tree.insert(2, "test");
      tree.insert(76, "test");
      tree.insert(55, "test");

      var anode = tree.getnode(50);

      expect(anode).not.toBeUndefined();
      expect(anode.count).toEqual(6);

      tree.delete(55);
      expect(anode.count).toEqual(5);

  });



});
