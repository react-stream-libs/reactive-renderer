"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
/**
 * creates Component( Props => Renderable ) from a Blueprint Class.
 * @param blueprintClass - the blueprint class
 */
function createComponentWithContext(blueprintClass) {
    return function (props, children, context) {
        return new types_1.Renderable({
            blueprint: blueprintClass,
            props: props,
            children: children,
            context: context
        });
    };
}
exports.createComponentWithContext = createComponentWithContext;