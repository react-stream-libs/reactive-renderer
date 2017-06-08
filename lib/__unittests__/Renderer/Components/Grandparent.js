"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const types_1 = require("./types");
class __GrandParent extends types_1.Blueprint {
    init(parent) {}
    updateBeforeChildren(props) {}
    updateAfterChildren(props) {}
    reorderChildren(oldChildrenList, oldChildrenDict, newChildrenList, newChildrenDict) {}
    cleanUp() {}
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
            this.logger.add(new types_1.LogItem({
                instance: this,
                blueprint: _GrandParent,
                type: 'init'
            }));
        }
        updateAfterChildren(props) {
            this.logger.add(new types_1.LogItem({
                instance: this,
                blueprint: _GrandParent,
                type: 'update',
                props
            }));
        }
        cleanUp() {
            this.logger.add(new types_1.LogItem({
                instance: this,
                blueprint: _GrandParent,
                type: 'delete'
            }));
        }
    }
    const grandParentComponent = __1.createComponent(_GrandParent);
    return {
        _GrandParent,
        GrandParent: grandParentComponent
    };
}
exports.getGrandparentComps = getGrandparentComps;