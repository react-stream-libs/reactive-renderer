"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * creates Component( Props => Renderable ) from a Blueprint Class.
 * @param blueprintClass - the blueprint class
 */
function createComponentWithContext(blueprintClass) {
    return function (props, children, context) {
        return {
            blueprint: blueprintClass,
            props: props,
            children: children,
            context: context
        };
    };
}
exports.createComponentWithContext = createComponentWithContext;