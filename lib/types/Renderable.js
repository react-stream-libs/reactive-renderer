"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var Renderable = function Renderable(args) {
    _classCallCheck(this, Renderable);

    this.blueprint = args.blueprint;
    this.props = args.props;
    this.children = args.children;
    this._parentables = args._parentables;
    this.context = args.context;
};

exports.Renderable = Renderable;