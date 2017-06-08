"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const Logger_1 = require("../../Logger");
const types_1 = require("./types");
class __Layer extends types_1.Blueprint {
    init(parent) {}
    updateBeforeChildren(props) {}
    updateAfterChildren(props) {}
    reorderChildren(oldChildrenList, oldChildrenDict, newChildrenList, newChildrenDict) {}
    cleanUp() {}
}
exports.__Layer = __Layer;
function getLayerComps(logger) {
    class _Layer extends __Layer {
        constructor() {
            super();
            this.logger = logger;
        }
        init(parent) {
            this.logger.add(new Logger_1.LogItem({
                instance: this,
                blueprint: _Layer,
                type: 'init'
            }));
        }
        updateAfterChildren(props) {
            this.logger.add(new Logger_1.LogItem({
                instance: this,
                blueprint: _Layer,
                type: 'update',
                props
            }));
        }
        cleanUp() {
            this.logger.add(new Logger_1.LogItem({
                instance: this,
                blueprint: _Layer,
                type: 'delete'
            }));
        }
        reorderChildren(oldChildrenList, oldChildrenDict, newChildrenList, newChildrenDict) {}
    }
    const layerComponent = __1.createComponent(_Layer);
    return {
        _Layer, Layer: layerComponent
    };
}
exports.getLayerComps = getLayerComps;