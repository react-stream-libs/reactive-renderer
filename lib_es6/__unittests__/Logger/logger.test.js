"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const _1 = require(".");
const BaseBlueprint_1 = require("../../types/BaseBlueprint");
class _Root extends BaseBlueprint_1.BaseBlueprint {
    init(parent) { }
    updateBeforeChildren(props) { }
    updateAfterChildren(props) { }
    cleanUp() { }
}
describe('unittest logger should...', () => {
    it('should log correctly', () => {
        const logger = new _1.default();
        logger.add(new _1.LogItem({
            type: 'init',
            key: 'grandparent',
        }));
        logger.add(new _1.LogItem({
            type: 'init',
            blueprint: _Root,
            props: {
                key: '123',
            }
        }));
        logger.partialMatch([
            new _1.LogItem({
                type: 'init',
            }),
            new _1.LogItem({
                type: 'init',
                blueprint: _Root
            })
        ]);
        chai.expect(() => {
            logger.partialMatch([
                new _1.LogItem({
                    type: 'init',
                }),
                new _1.LogItem({
                    type: 'update',
                    blueprint: _Root
                })
            ]);
        }).to.throw();
    });
});
