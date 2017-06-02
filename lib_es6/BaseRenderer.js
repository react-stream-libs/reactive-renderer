"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class BaseReactiveRenderer {
}
exports.BaseReactiveRenderer = BaseReactiveRenderer;
// FIXME: implement a loop-variant for speed up!
function renderChild(instanceTree, toRender) {
    const toRenderChildrenMap = _.reduce(toRender.children, (mappedChildren, child) => {
        mappedChildren[child.props.key] = child;
        return mappedChildren;
    }, {});
    _.forEach(instanceTree.childrenDict, (instanceTreeChild, key) => {
        if (!toRenderChildrenMap[key]
            || !(instanceTreeChild.instance instanceof toRenderChildrenMap[key].blueprint)) {
            deleteChild(instanceTree, key);
        }
    });
    _.forEach(toRender.children, (renderableChild, renderableChildKey) => {
        const key = renderableChild.props.key;
        if (!instanceTree.childrenDict[key]) {
            const childInstance = new renderableChild.blueprint();
            childInstance.init(instanceTree.instance);
            childInstance.applyInitialProps(renderableChild.props);
            instanceTree.childrenDict[key] = {
                instance: childInstance,
                childrenDict: {},
                childrenList: [],
                key,
            };
        }
        const childInstanceTree = instanceTree.childrenDict[key];
        childInstanceTree.instance.updateBeforeChildren(renderableChild.props);
        renderChild(childInstanceTree, renderableChild);
        childInstanceTree.instance.updateAfterChildren(renderableChild.props);
    });
}
exports.renderChild = renderChild;
function deleteChild(instanceTree, childKey) {
    const childToDelete = instanceTree.childrenDict[childKey];
    _.forEach(childToDelete.childrenDict, (childOfChild, key) => deleteChild(childToDelete, key));
    childToDelete.instance.cleanUp();
    delete instanceTree.childrenDict[childKey];
}
exports.deleteChild = deleteChild;
exports.default = BaseReactiveRenderer;
