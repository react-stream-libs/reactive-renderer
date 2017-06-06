"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * creates Component( Props => Renderable ) from a Blueprint Class.
 * @param blueprintClass - the blueprint class
 */
function createComponent(blueprintClass) {
    return (props, children) => ({
        blueprint: blueprintClass,
        props,
        children
    });
}
exports.createComponent = createComponent;