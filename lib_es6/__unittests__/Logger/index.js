"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class Logger {
    constructor(logs) {
        this.logs = logs || [];
    }
    add(logItem) {
        this.logs.push(logItem);
    }
    partialMatch(partialLogItems) {
        lodash_1.forEach(partialLogItems, (value, key) => this.logs[key].partialMatch(value));
    }
}
exports.default = Logger;
class LogItem {
    constructor(args) {
        this.data = args;
    }
    partialMatch(toMatch) {
        lodash_1.forEach(toMatch.data, (value, key) => {
            if (!lodash_1.isEqual(this.data[key], value)) {
                // FIXME: use stripMargins
                throw new Error(`
            LogItem Mismatch!
              value: ${value}
              key: ${key}
              this.data[key]: ${this.data[key]}
          `);
            }
        });
    }
}
exports.LogItem = LogItem;
