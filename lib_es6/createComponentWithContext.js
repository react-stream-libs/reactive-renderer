"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * creates Component( Props => Renderable ) from a Blueprint Class.
 * @param blueprintClass - the blueprint class
 */
function createComponentWithContext(blueprintClass) {
    return (props, children, context) => ({
        blueprint: blueprintClass,
        props,
        children,
        context,
    });
}
exports.createComponentWithContext = createComponentWithContext;
