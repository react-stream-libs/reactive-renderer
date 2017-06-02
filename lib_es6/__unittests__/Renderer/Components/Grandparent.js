"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseBlueprint_1 = require("../../../types/BaseBlueprint");
const createComponent_1 = require("../../../createComponent");
const Logger_1 = require("../../Logger");
;
class __GrandParent extends BaseBlueprint_1.BaseBlueprint {
    init(parent) { }
    updateBeforeChildren(props) { }
    updateAfterChildren(props) { }
    cleanUp() { }
}
exports.__GrandParent = __GrandParent;
function getGrandparentComps(logger) {
    class _GrandParent extends __GrandParent {
        constructor() {
            super();
            this.name = 'GrandParent';
            this.logger = logger;
        }
        init(parent) {
            this.logger.add(new Logger_1.LogItem({
                instance: this,
                blueprint: _GrandParent,
                type: 'init',
            }));
        }
        updateAfterChildren(props) {
            this.logger.add(new Logger_1.LogItem({
                instance: this,
                blueprint: _GrandParent,
                type: 'update',
                props,
            }));
        }
        cleanUp() {
            this.logger.add(new Logger_1.LogItem({
                instance: this,
                blueprint: _GrandParent,
                type: 'delete',
            }));
        }
    }
    const GrandParent = createComponent_1.createComponent(_GrandParent);
    return {
        _GrandParent, GrandParent,
    };
}
exports.getGrandparentComps = getGrandparentComps;
