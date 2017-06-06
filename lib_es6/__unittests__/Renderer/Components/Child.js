"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createComponent_1 = require("../../../createComponent");
const types_1 = require("./types");
class __Child extends types_1.Blueprint {
    init(parent) {
        this.logger.add(new types_1.LogItem({
            instance: this,
            blueprint: __Child,
            type: 'init',
        }));
    }
    updateBeforeChildren(props) {
    }
    updateAfterChildren(props) {
    }
    reorderChildren(oldChildrenList, oldChildrenDict, newChildrenList, newChildrenDict) { }
    cleanUp() {
    }
}
exports.__Child = __Child;
function getChildComps(logger) {
    class _Child extends __Child {
        constructor() {
            super();
            this.logger = logger;
        }
    }
    const childComponent = createComponent_1.createComponent(_Child);
    return {
        _Child, Child: childComponent,
    };
}
exports.getChildComps = getChildComps;
