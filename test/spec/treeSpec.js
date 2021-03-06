var Tree = require('../../lib/Tree').Tree;

describe("Tree", function () {

  it("test addelement not called for string", function () {
    var tree = new Tree();
    spyOn(tree, "addelement").andCallThrough();
    tree.insert("key", "value");

    expect(tree.addelement).not.toHaveBeenCalled();
  });

  it("test addelement called for number", function () {
    var tree = new Tree();
    spyOn(tree, "addelement").andCallThrough();
    tree.insert(1, "value");

    expect(tree.addelement).toHaveBeenCalled();
  });


  it("test deleteelement called", function () {
    var tree = new Tree();
    spyOn(tree, "addelement").andCallThrough();
    spyOn(tree, "deleteelement").andCallThrough();

    tree.insert(1, "value");
    expect(tree.addelement).toHaveBeenCalled();

    tree.delete(1);
    expect(tree.deleteelement).toHaveBeenCalled();
  });

});
