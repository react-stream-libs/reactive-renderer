"use strict";
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
    _.forEach(instanceTree.children, (instanceTreeChild, key) => {
        if (!toRenderChildrenMap[key]
            || !(instanceTreeChild.instance instanceof toRenderChildrenMap[key].blueprint)) {
            deleteChild(instanceTree, key);
        }
    });
    _.forEach(toRender.children, (renderableChild, renderableChildKey) => {
        const key = renderableChild.props.key;
        if (!instanceTree.children[key]) {
            const childInstance = new renderableChild.blueprint();
            childInstance.init(instanceTree.instance);
            childInstance.applyInitialProps(renderableChild.props);
            instanceTree.children[key] = {
                instance: childInstance,
                children: {}
            };
        }
        const childInstanceTree = instanceTree.children[key];
        childInstanceTree.instance.updateBeforeChildren(renderableChild.props);
        renderChild(childInstanceTree, renderableChild);
        childInstanceTree.instance.updateAfterChildren(renderableChild.props);
    });
}
exports.renderChild = renderChild;
function deleteChild(instanceTree, childKey) {
    const childToDelete = instanceTree.children[childKey];
    _.forEach(childToDelete.children, (childOfChild, key) => deleteChild(childToDelete, key));
    childToDelete.instance.cleanUp();
    delete instanceTree.children[childKey];
}
exports.deleteChild = deleteChild;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseReactiveRenderer;
