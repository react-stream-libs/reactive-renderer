"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * example of hiding CommonBlueprintBase from type definitions.
 * re-defines somewhat-bloated types due to CommonBlueprintBase.
 */
const __1 = require("../../..");
exports.BaseBlueprint = __1.BaseBlueprint;
const Logger_1 = require("../../Logger");
class Blueprint extends __1.BaseBlueprint {
}
exports.Blueprint = Blueprint;
class Logger extends Logger_1.default {
}
exports.Logger = Logger;
class LogItem extends Logger_1.LogItem {
}
exports.LogItem = LogItem;
function createComponent(blueprintClass) {
    return __1.createComponent(blueprintClass);
}
exports.createComponent = createComponent;
