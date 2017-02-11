"use strict";
/** Fake Root */
const _ = require("lodash");
const BaseRenderer_1 = require("../../BaseRenderer");
const FakeRoot_1 = require("./Components/FakeRoot");
class FakeRenderer extends BaseRenderer_1.default {
    constructor(logger) {
        super();
        this.logger = logger;
        this.instanceTree = {
            instance: new FakeRoot_1._FakeRoot(logger),
            children: {},
        };
    }
    render(toRender, rootProps) {
        const renderRoot = FakeRoot_1.default({
            key: '__FAKEROOT__',
        }, _.compact([
            toRender,
        ]));
        BaseRenderer_1.renderChild(this.instanceTree, renderRoot);
    }
    dispose() { }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FakeRenderer;
