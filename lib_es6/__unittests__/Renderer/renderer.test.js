"use strict";
const Grandparent_1 = require("./Components/Grandparent");
const Parent_1 = require("./Components/Parent");
const Logger_1 = require("../Logger");
const FakeRenderer_1 = require("./FakeRenderer");
describe('Renderer should...', () => {
    it('corrently init, update, and remove one-depth', () => {
        const logger = new Logger_1.default();
        const { GrandParent, _GrandParent } = Grandparent_1.getGrandparentComps(logger);
        const { Parent, _Parent } = Parent_1.getParentComps(logger);
        const renderer = new FakeRenderer_1.default(logger);
        renderer.render(GrandParent({
            key: 'grandparent'
        }, []));
        logger.partialMatch([
            new Logger_1.LogItem({
                blueprint: _GrandParent,
                type: 'init',
            }),
            new Logger_1.LogItem({
                blueprint: _GrandParent,
                type: 'update',
            }),
        ]);
        renderer.render(GrandParent({
            key: 'grandparent',
        }, [
            Parent({
                key: 'parent',
            }, []),
        ]));
        const loggerAfterGrandparentInit = new Logger_1.default(logger.logs.slice(2));
        loggerAfterGrandparentInit.partialMatch([
            new Logger_1.LogItem({
                blueprint: _Parent,
                type: 'init',
            }),
            new Logger_1.LogItem({
                blueprint: _Parent,
                type: 'update',
            }),
            new Logger_1.LogItem({
                blueprint: _GrandParent,
                type: 'update',
            }),
        ]);
        renderer.render(null);
        const loggerAfterDeletion = new Logger_1.default(logger.logs.slice(5));
        loggerAfterDeletion.partialMatch([
            new Logger_1.LogItem({
                blueprint: _Parent,
                type: 'delete',
            }),
            new Logger_1.LogItem({
                blueprint: _GrandParent,
                type: 'delete',
            }),
        ]);
    });
});
