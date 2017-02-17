import { getGrandparentComps } from './Components/Grandparent';
import { getLayerComps } from './Components/Layer';
import Logger, { LogItem } from '../Logger';

import FakeRenderer from './FakeRenderer';

describe('Renderer should...', () => {
  it('corrently init, update, and remove one-depth', () => {
    const logger = new Logger();
    const { GrandParent, _GrandParent } = getGrandparentComps(logger);
    const { Layer, _Layer } = getLayerComps(logger);
    const renderer = new FakeRenderer(logger);
    renderer.render(GrandParent({
      key: 'grandparent'
    }, []));

    logger.partialMatch([
      new LogItem({
        blueprint: _GrandParent,
        type: 'init',
      }),
      new LogItem({
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
    const loggerAfterGrandparentInit = new Logger(
      logger.logs.slice(2)
    );
    loggerAfterGrandparentInit.partialMatch([
      new LogItem({
        blueprint: _Layer,
        type: 'init',
      }),
      new LogItem({
        blueprint: _Layer,
        type: 'init',
      }),
      new LogItem({
        blueprint: _Layer,
        type: 'update',
        props: {
          key: 'innerLayer',
        }
      }),
      new LogItem({
        blueprint: _Layer,
        type: 'update',
        props: {
          key: 'parent',
        }
      }),
      new LogItem({
        blueprint: _GrandParent,
        type: 'update',
      }),
    ]);
    renderer.render(null);
    const loggerAfterDeletion = new Logger(
      logger.logs.slice(7)
    );
    loggerAfterDeletion.partialMatch([
      new LogItem({
        blueprint: _Layer,
        type: 'delete',
      }),
      new LogItem({
        blueprint: _Layer,
        type: 'delete',
      }),
      new LogItem({
        blueprint: _GrandParent,
        type: 'delete',
      }),
    ]);
  });
})