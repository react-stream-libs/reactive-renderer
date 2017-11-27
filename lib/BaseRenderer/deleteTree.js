"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function deleteTree(instanceTree, renderCycleId) {
    lodash_1.forEach(instanceTree.childrenList, function (child) {
        deleteTree(child, renderCycleId);
    });
    instanceTree.instance.cleanUp(renderCycleId);
    delete instanceTree.childrenDict;
    delete instanceTree.childrenList;
}
exports.deleteTree = deleteTree;