var Tree = require('../../lib/Tree').Tree;

describe("Tree", function () {

  it("test addelement called", function () {
    var tree = new Tree();
    spyOn(tree, "addelement").andCallThrough();
    tree.insert("key", "value");

    expect(tree.addelement).toHaveBeenCalled();
  });


  it("test deleteelement called", function () {
    var tree = new Tree();
    spyOn(tree, "addelement").andCallThrough();
    spyOn(tree, "deleteelement").andCallThrough();

    tree.insert("key", "value");
    expect(tree.addelement).toHaveBeenCalled();

    tree.delete("key");
    expect(tree.deleteelement).toHaveBeenCalled();
  });

  it("tree insert same key twice", function () {
    var tree = new Tree();

    tree.insert("key", "value");
    tree.insert("key", "value");

    var key = tree.getnode("key");

    expect(key.value.length).toEqual(2);
  });
});
