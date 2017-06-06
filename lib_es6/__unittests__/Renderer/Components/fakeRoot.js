"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
exports.BaseBlueprint = types_1.BaseBlueprint;
class NoneExistentBlueprint extends types_1.Blueprint {
    init(parent) { }
    reorderChildren(oldChildrenList, oldChildrenDict, newChildrenList, newChildrenDict) { }
    updateBeforeChildren(props) { }
    updateAfterChildren(props) { }
    cleanUp() { }
}
exports.NoneExistentBlueprint = NoneExistentBlueprint;
class _FakeRoot extends types_1.Blueprint {
    constructor(logger) {
        super();
        this.logger = logger;
    }
    init(parent) { }
    updateBeforeChildren(props) { }
    updateAfterChildren(props) { }
    reorderChildren(oldChildrenList, oldChildrenDict, newChildrenList, newChildrenDict) { }
    cleanUp() { }
}
exports._FakeRoot = _FakeRoot;
/**
 * INTERNAL USE: Fake Root
 * @param props: FakeRoot props
 */
const fakeRoot = types_1.createComponent(_FakeRoot);
exports.default = fakeRoot;
