"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Renderable {
    constructor(args) {
        this.blueprint = args.blueprint;
        this.props = args.props;
        this.children = args.children;
        this._parentables = args._parentables;
        this.context = args.context;
    }
}
exports.Renderable = Renderable;
