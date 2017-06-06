"use strict";
/**
 * FakeRenderer
 */

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const BaseRenderer_1 = require("../../BaseRenderer");
const fakeRoot_1 = require("./Components/fakeRoot");
class FakeRenderer extends BaseRenderer_1.default {
    constructor(logger) {
        super();
        this.logger = logger;
        this.instanceTree = {
            instance: new fakeRoot_1._FakeRoot(logger),
            key: 'FAKE_RENDERER',
            childrenDict: {},
            childrenList: []
        };
    }
    render(toRender, rootProps) {
        const renderRoot = fakeRoot_1.default({
            key: '__FAKEROOT__'
        }, lodash_1.compact([toRender]));
        BaseRenderer_1.renderChild(this.instanceTree, renderRoot);
    }
    dispose() {}
}
exports.default = FakeRenderer;