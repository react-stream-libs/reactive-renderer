"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var uuid = require("uuid");
var deleteTree_1 = require("./deleteTree");
// FIXME: implement a loop-variant for speed up!
function renderChild(instanceTree, toRender, context) {
    var renderCycleId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : uuid.v4();

    var newChildrenList = [];
    var newChildrenDict = {};
    var instance = instanceTree.instance;
    instance.__children = [];
    var childrenChanged = false;
    // CREATE, TRAVERSE, UPDATE
    toRender.children.forEach(function (toRenderChild, nth) {
        var toRenderChildKey = toRenderChild.props.key;
        var toRenderChildContext = toRenderChild.context;
        var toRenderChildProps = toRenderChild.props;
        var childInstanceTree = instanceTree.childrenDict[toRenderChildKey];
        if (!childInstanceTree) {
            var newChildInstance = new toRenderChild.blueprint();
            toRenderChildProps.beforeInit && toRenderChildProps.beforeInit(newChildInstance, toRenderChildProps);
            newChildInstance.init(instanceTree.instance, toRenderChildProps, toRenderChildContext);
            toRenderChildProps.afterInit && toRenderChildProps.afterInit(newChildInstance, toRenderChildProps);
            childInstanceTree = {
                instance: newChildInstance,
                childrenDict: {},
                childrenList: [],
                key: toRenderChildKey,
                context: toRenderChildContext
            };
            childrenChanged = true;
        }
        instance.__children.push(childInstanceTree.instance);
        newChildrenList.push(childInstanceTree);
        newChildrenDict[toRenderChildKey] = childInstanceTree;
        toRenderChildProps.beforeChildrenUpdate && toRenderChildProps.beforeChildrenUpdate(childInstanceTree.instance, toRenderChildProps);
        childInstanceTree.instance.updateBeforeChildren(toRenderChild.props, toRenderChildContext, renderCycleId);
        renderChild(childInstanceTree, toRenderChild, toRenderChild.context, renderCycleId);
        childInstanceTree.instance.updateAfterChildren(toRenderChild.props, toRenderChildContext, renderCycleId);
        childInstanceTree.instance.prevProps = toRenderChildProps;
    });
    // REMOVE
    lodash_1.forEach(instanceTree.childrenDict, function (oldChild, oldChildKey) {
        if (!newChildrenDict[oldChildKey]) {
            oldChild.instance.prevProps && oldChild.instance.prevProps.beforeCleanup && oldChild.instance.prevProps.beforeCleanup(oldChild.instance);
            deleteTree_1.deleteTree(oldChild);
            oldChild.instance.cleanUp();
            oldChild.instance.prevProps && oldChild.instance.prevProps.afterCleanup && oldChild.instance.prevProps.afterCleanup(oldChild.instance);
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