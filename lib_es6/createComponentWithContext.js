"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
/**
 * creates Component( Props => Renderable ) from a Blueprint Class.
 * @param blueprintClass - the blueprint class
 */
function createComponentWithContext(blueprintClass) {
    return (props, children, context) => new types_1.Renderable({
        blueprint: blueprintClass,
        props,
        children,
        context,
    });
}
exports.createComponentWithContext = createComponentWithContext;
