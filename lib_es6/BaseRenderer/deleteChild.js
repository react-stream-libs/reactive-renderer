"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function deleteChild(instanceTree, childKey) {
    const childToDelete = instanceTree.childrenDict[childKey];
    lodash_1.forEach(childToDelete.childrenDict, (childOfChild, key) => deleteChild(childToDelete, key));
    childToDelete.instance.cleanUp();
    delete instanceTree.childrenDict[childKey];
}
exports.deleteChild = deleteChild;
