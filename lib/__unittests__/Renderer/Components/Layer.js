"use strict";

const BaseBlueprint_1 = require("../../../types/BaseBlueprint");
const createComponent_1 = require("../../../createComponent");
const Logger_1 = require("../../Logger");
;
class __Layer extends BaseBlueprint_1.BaseBlueprint {
    init(parent) {}
    updateBeforeChildren(props) {}
    updateAfterChildren(props) {}
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
    }
    const Layer = createComponent_1.createComponent(_Layer);
    return {
        _Layer, Layer
    };
}
exports.getLayerComps = getLayerComps;