"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class BaseRenderer {}
exports.BaseRenderer = BaseRenderer;
// FIXME: implement a loop-variant for speed up!
function renderChild(instanceTree, toRender, context) {
    const newChildrenList = [];
    const newChildrenDict = {};
    let childrenChanged = false;
    // CREATE, TRAVERSE, UPDATE
    toRender.children.forEach((toRenderChild, nth) => {
        const toRenderChildKey = toRenderChild.props.key;
        const toRenderChildContext = toRenderChild.context;
        const toRenderChildProps = toRenderChild.props;
        let childInstanceTree = instanceTree.childrenDict[toRenderChildKey];
        if (!childInstanceTree) {
            const instance = new toRenderChild.blueprint();
            toRenderChildProps.beforeInit && toRenderChildProps.beforeInit(instance, toRenderChildProps);
            instance.init(instanceTree.instance, toRenderChildContext);
            toRenderChildProps.afterInit && toRenderChildProps.afterInit(instance, toRenderChildProps);
            childInstanceTree = {
                instance,
                childrenDict: {},
                childrenList: [],
                key: toRenderChildKey,
                context: toRenderChildContext
            };
            childrenChanged = true;
        }
        newChildrenList.push(childInstanceTree);
        newChildrenDict[toRenderChildKey] = childInstanceTree;
        toRenderChildProps.beforeChildrenUpdate && toRenderChildProps.beforeChildrenUpdate(childInstanceTree.instance, toRenderChildProps);
        childInstanceTree.instance.updateBeforeChildren(toRenderChild.props, toRenderChildContext);
        renderChild(childInstanceTree, toRenderChild, toRenderChild.context);
        childInstanceTree.instance.updateAfterChildren(toRenderChild.props, toRenderChildContext);
    });
    // REMOVE
    lodash_1.forEach(instanceTree.childrenDict, (oldChild, oldChildKey) => {
        if (!newChildrenDict[oldChildKey]) {
            deleteTree(oldChild);
            oldChild.instance.cleanUp();
            childrenChanged = true;
        }
    });
    childrenChanged = childrenChanged || lodash_1.every(instanceTree.childrenList, (oldChild, nth) => oldChild.key === (newChildrenList[nth] && newChildrenList[nth].key));
    if (!childrenChanged) {
        instanceTree.instance.reorderChildren(instanceTree.childrenList, instanceTree.childrenDict, newChildrenList, newChildrenDict);
    }
    instanceTree.childrenDict = newChildrenDict;
    instanceTree.childrenList = newChildrenList;
}
exports.renderChild = renderChild;
function deleteTree(instanceTree) {
    lodash_1.forEach(instanceTree.childrenList, child => {
        deleteTree(child);
    });
    instanceTree.instance.cleanUp();
    delete instanceTree.childrenDict;
    delete instanceTree.childrenList;
}
exports.deleteTree = deleteTree;
function deleteChild(instanceTree, childKey) {
    const childToDelete = instanceTree.childrenDict[childKey];
    lodash_1.forEach(childToDelete.childrenDict, (childOfChild, key) => deleteChild(childToDelete, key));
    childToDelete.instance.cleanUp();
    delete instanceTree.childrenDict[childKey];
}
exports.deleteChild = deleteChild;
exports.default = BaseRenderer;