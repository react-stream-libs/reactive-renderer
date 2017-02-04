import { getGrandparentComps } from './Components/Grandparent';
import { getParentComps } from './Components/Parent';
import Logger, { LogItem } from '../Logger';

import FakeRenderer from './FakeRenderer';

describe('Renderer should...', () => {
  it('corrently init, update, and remove one-depth', () => {
    const logger = new Logger();
    const { GrandParent, _GrandParent } = getGrandparentComps(logger);
    const { Parent, _Parent } = getParentComps(logger);
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
      Parent({
        key: 'parent',
      }, []),
    ]));
    const loggerAfterGrandparentInit = new Logger(
      logger.logs.slice(2)
    );
    loggerAfterGrandparentInit.partialMatch([
      new LogItem({
        blueprint: _Parent,
        type: 'init',
      }),
      new LogItem({
        blueprint: _Parent,
        type: 'update',
      }),
      new LogItem({
        blueprint: _GrandParent,
        type: 'update',
      }),
    ]);
    renderer.render();
    const loggerAfterDeletion = new Logger(
      logger.logs.slice(5)
    )
    loggerAfterDeletion.partialMatch([
      new LogItem({
        blueprint: _Parent,
        type: 'delete',
      }),
      new LogItem({
        blueprint: _GrandParent,
        type: 'delete',
      }),
    ]);
  });
})