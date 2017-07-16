"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function deleteTree(instanceTree) {
    lodash_1.forEach(instanceTree.childrenList, function (child) {
        deleteTree(child);
    });
    instanceTree.instance.cleanUp();
    delete instanceTree.childrenDict;
    delete instanceTree.childrenList;
}
exports.deleteTree = deleteTree;