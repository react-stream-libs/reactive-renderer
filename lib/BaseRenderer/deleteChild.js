"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function deleteChild(instanceTree, childKey) {
    var childToDelete = instanceTree.childrenDict[childKey];
    lodash_1.forEach(childToDelete.childrenDict, function (childOfChild, key) {
        return deleteChild(childToDelete, key);
    });
    childToDelete.instance.cleanUp();
    delete instanceTree.childrenDict[childKey];
}
exports.deleteChild = deleteChild;