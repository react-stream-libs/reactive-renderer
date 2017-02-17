"use strict";
const Grandparent_1 = require("./Components/Grandparent");
const Layer_1 = require("./Components/Layer");
const Logger_1 = require("../Logger");
const FakeRenderer_1 = require("./FakeRenderer");
describe('Renderer should...', () => {
    it('corrently init, update, and remove one-depth', () => {
        const logger = new Logger_1.default();
        const { GrandParent, _GrandParent } = Grandparent_1.getGrandparentComps(logger);
        const { Layer, _Layer } = Layer_1.getLayerComps(logger);
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
            Layer({
                key: 'parent',
            }, [
                Layer({
                    key: 'innerLayer',
                }, []),
            ]),
        ]));
        const loggerAfterGrandparentInit = new Logger_1.default(logger.logs.slice(2));
        loggerAfterGrandparentInit.partialMatch([
            new Logger_1.LogItem({
                blueprint: _Layer,
                type: 'init',
            }),
            new Logger_1.LogItem({
                blueprint: _Layer,
                type: 'init',
            }),
            new Logger_1.LogItem({
                blueprint: _Layer,
                type: 'update',
                props: {
                    key: 'innerLayer',
                }
            }),
            new Logger_1.LogItem({
                blueprint: _Layer,
                type: 'update',
                props: {
                    key: 'parent',
                }
            }),
            new Logger_1.LogItem({
                blueprint: _GrandParent,
                type: 'update',
            }),
        ]);
        renderer.render(null);
        const loggerAfterDeletion = new Logger_1.default(logger.logs.slice(7));
        loggerAfterDeletion.partialMatch([
            new Logger_1.LogItem({
                blueprint: _Layer,
                type: 'delete',
            }),
            new Logger_1.LogItem({
                blueprint: _Layer,
                type: 'delete',
            }),
            new Logger_1.LogItem({
                blueprint: _GrandParent,
                type: 'delete',
            }),
        ]);
    });
});
