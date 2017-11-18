"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const uuid = require("uuid");
const deleteTree_1 = require("./deleteTree");
// FIXME: implement a loop-variant for speed up!
function renderChild(instanceTree, toRender, context, renderCycleId = uuid.v4()) {
    const newChildrenList = [];
    const newChildrenDict = {};
    const instance = instanceTree.instance;
    instance.__children = [];
    let childrenChanged = false;
    // CREATE, TRAVERSE, UPDATE
    toRender.children.forEach((toRenderChild, nth) => {
        const toRenderChildKey = toRenderChild.props.key;
        const toRenderChildContext = toRenderChild.context;
        const toRenderChildProps = toRenderChild.props;
        let childInstanceTree = instanceTree.childrenDict[toRenderChildKey];
        if (!childInstanceTree) {
            const newChildInstance = new toRenderChild.blueprint();
            toRenderChildProps.beforeInit &&
                toRenderChildProps.beforeInit(newChildInstance, toRenderChildProps);
            newChildInstance.init(instanceTree.instance, toRenderChildProps, toRenderChildContext);
            toRenderChildProps.afterInit &&
                toRenderChildProps.afterInit(newChildInstance, toRenderChildProps);
            childInstanceTree = {
                instance: newChildInstance,
                childrenDict: {},
                childrenList: [],
                key: toRenderChildKey,
                context: toRenderChildContext,
            };
            childrenChanged = true;
        }
        instance.__children.push(childInstanceTree.instance);
        newChildrenList.push(childInstanceTree);
        newChildrenDict[toRenderChildKey] = childInstanceTree;
        toRenderChildProps.beforeChildrenUpdate &&
            toRenderChildProps.beforeChildrenUpdate(childInstanceTree.instance, toRenderChildProps);
        childInstanceTree.instance.updateBeforeChildren(toRenderChild.props, toRenderChildContext, renderCycleId);
        renderChild(childInstanceTree, toRenderChild, toRenderChild.context, renderCycleId);
        childInstanceTree.instance.updateAfterChildren(toRenderChild.props, toRenderChildContext, renderCycleId);
        childInstanceTree.instance.prevProps = toRenderChildProps;
    });
    // REMOVE
    lodash_1.forEach(instanceTree.childrenDict, (oldChild, oldChildKey) => {
        if (!newChildrenDict[oldChildKey]) {
            oldChild.instance.prevProps &&
                oldChild.instance.prevProps.beforeCleanup &&
                oldChild.instance.prevProps.beforeCleanup(oldChild.instance);
            deleteTree_1.deleteTree(oldChild);
            oldChild.instance.cleanUp();
            oldChild.instance.prevProps &&
                oldChild.instance.prevProps.afterCleanup &&
                oldChild.instance.prevProps.afterCleanup(oldChild.instance);
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