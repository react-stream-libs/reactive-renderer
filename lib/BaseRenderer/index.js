"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var deleteTree_1 = require("./deleteTree");
exports.deleteTree = deleteTree_1.deleteTree;
var deleteChild_1 = require("./deleteChild");
exports.deleteChild = deleteChild_1.deleteChild;
var renderChild_1 = require("./renderChild");
exports.renderChild = renderChild_1.renderChild;

var BaseRenderer = function BaseRenderer() {
  _classCallCheck(this, BaseRenderer);
};

exports.BaseRenderer = BaseRenderer;
// tslint:disable export-name
exports["default"] = BaseRenderer;