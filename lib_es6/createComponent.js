"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * creates Component( Props => Renderable ) from a Blueprint Class.
 * @param blueprintClass - the blueprint class
 */
function createComponent(blueprintClass) {
    return function _componentMetaData(props, children) {
        return {
            blueprint: blueprintClass,
            props,
            children,
        };
    };
}
exports.createComponent = createComponent;
