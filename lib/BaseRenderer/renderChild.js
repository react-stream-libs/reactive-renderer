"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var deleteTree_1 = require("./deleteTree");
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
            deleteTree_1.deleteTree(oldChild);
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