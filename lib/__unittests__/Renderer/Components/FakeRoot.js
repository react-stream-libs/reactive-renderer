"use strict";

const createComponent_1 = require("../../../createComponent");
const BaseBlueprint_1 = require("../../../types/BaseBlueprint");
// _NoneExistentBlueprint
class NoneExistentBlueprint extends BaseBlueprint_1.BaseBlueprint {
    init(parent) {}
    updateBeforeChildren(props) {}
    updateAfterChildren(props) {}
    cleanUp() {}
}
exports.NoneExistentBlueprint = NoneExistentBlueprint;
class _FakeRoot extends BaseBlueprint_1.BaseBlueprint {
    constructor(logger) {
        super();
        this.logger = logger;
    }
    init(parent) {}
    updateBeforeChildren(props) {}
    updateAfterChildren(props) {}
    cleanUp() {}
}
exports._FakeRoot = _FakeRoot;
/**
 * INTERNAL USE: Fake Root
 * @param props: FakeRoot props
 */
exports.FakeRoot = createComponent_1.createComponent(_FakeRoot);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.FakeRoot;