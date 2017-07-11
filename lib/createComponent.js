"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
/**
 * creates Component( Props => Renderable ) from a Blueprint Class.
 * @param blueprintClass - the blueprint class
 */
exports.defaultContext = {
    __EXTENDS_ICONTEXT_BASE: null
};
function createComponent(blueprintClass) {
    return function (props, children) {
        return new types_1.Renderable({
            blueprint: blueprintClass,
            props: props,
            children: children,
            context: exports.defaultContext
        });
    };
}
exports.createComponent = createComponent;