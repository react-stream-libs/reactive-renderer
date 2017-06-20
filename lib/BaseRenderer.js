"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");

var BaseRenderer = function BaseRenderer() {
    _classCallCheck(this, BaseRenderer);
};

exports.BaseRenderer = BaseRenderer;
// FIXME: implement a loop-variant for speed up!
function renderChild(instanceTree, toRender, context) {
    var newChildrenList = [];
    var newChildrenDict = {};
    var childrenChanged = false;
    // CREATE, TRAVERSE, UPDATE
    toRender.children.forEach(function (toRenderChild, nth) {
        var toRenderChildKey = toRenderChild.props.key;
        var toRenderChildContext = toRenderChild.context;
        var toRenderChildProps = toRenderChild.props;
        var childInstanceTree = instanceTree.childrenDict[toRenderChildKey];
        if (!childInstanceTree) {
            var instance = new toRenderChild.blueprint();
            toRenderChildProps.beforeInit && toRenderChildProps.beforeInit(instance, toRenderChildProps);
            instance.init(instanceTree.instance, toRenderChildContext);
            toRenderChildProps.afterInit && toRenderChildProps.afterInit(instance, toRenderChildProps);
            childInstanceTree = {
                instance: instance,
                childrenDict: {},
                childrenList: [],
                key: toRenderChildKey,
                context: toRenderChildContext
            };
            childrenChanged = true;
        }
        childInstanceTree.prevProps = toRenderChildProps;
        newChildrenList.push(childInstanceTree);
        newChildrenDict[toRenderChildKey] = childInstanceTree;
        toRenderChildProps.beforeChildrenUpdate && toRenderChildProps.beforeChildrenUpdate(childInstanceTree.instance, toRenderChildProps);
        childInstanceTree.instance.updateBeforeChildren(toRenderChild.props, toRenderChildContext);
        renderChild(childInstanceTree, toRenderChild, toRenderChild.context);
        childInstanceTree.instance.updateAfterChildren(toRenderChild.props, toRenderChildContext);
    });
    // REMOVE
    lodash_1.forEach(instanceTree.childrenDict, function (oldChild, oldChildKey) {
        if (!newChildrenDict[oldChildKey]) {
            oldChild.prevProps && oldChild.prevProps.beforeCleanup && oldChild.prevProps.beforeCleanup(oldChild.instance);
            deleteTree(oldChild);
            oldChild.instance.cleanUp();
            oldChild.prevProps && oldChild.prevProps.afterCleanup && oldChild.prevProps.afterCleanup(oldChild.instance);
            childrenChanged = true;
        }
    });
    childrenChanged = childrenChanged || lodash_1.every(instanceTree.childrenList, function (oldChild, nth) {
        return oldChild.key === (newChildrenList[nth] && newChildrenList[nth].key);
    });
    if (!childrenChanged) {
        instanceTree.instance.reorderChildren(instanceTree.childrenList, instanceTree.childrenDict, newChildrenList, newChildrenDict);
    }
    instanceTree.childrenDict = newChildrenDict;
    instanceTree.childrenList = newChildrenList;
}
exports.renderChild = renderChild;
function deleteTree(instanceTree) {
    lodash_1.forEach(instanceTree.childrenList, function (child) {
        deleteTree(child);
    });
    instanceTree.instance.cleanUp();
    delete instanceTree.childrenDict;
    delete instanceTree.childrenList;
}
exports.deleteTree = deleteTree;
function deleteChild(instanceTree, childKey) {
    var childToDelete = instanceTree.childrenDict[childKey];
    lodash_1.forEach(childToDelete.childrenDict, function (childOfChild, key) {
        return deleteChild(childToDelete, key);
    });
    childToDelete.instance.cleanUp();
    delete instanceTree.childrenDict[childKey];
}
exports.deleteChild = deleteChild;
exports["default"] = BaseRenderer;