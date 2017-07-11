"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
/**
 * creates Component( Props => Renderable ) from a Blueprint Class.
 * @param blueprintClass - the blueprint class
 */
exports.defaultContext = {
    __EXTENDS_ICONTEXT_BASE: null,
};
function createComponent(blueprintClass) {
    return (props, children) => new types_1.Renderable({
        blueprint: blueprintClass,
        props,
        children,
        context: exports.defaultContext,
    });
}
exports.createComponent = createComponent;
