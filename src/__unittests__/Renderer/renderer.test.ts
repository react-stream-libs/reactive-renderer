import { getGrandparentComps } from './Components/Grandparent';
import { getLayerComps } from './Components/Layer';
import { getContextLayerComponent } from './Components/ContextLayer';
import Logger, { LogItem } from '../Logger';

import FakeRenderer from './FakeRenderer';

describe('[Renderer]', () => {
  it('... should corrently init, update, and remove one-depth', () => {
    const logger = new Logger();
    const { GrandParent, _GrandParent } = getGrandparentComps(logger);
    const { Layer, _Layer } = getLayerComps(logger);
    const { ContextLayer, _ContextLayer }  = getContextLayerComponent(logger);
    const renderer = new FakeRenderer(logger);
    renderer.render(
      GrandParent(
        {
          key: 'grandparent'
        },
        []
      ), { __EXTENDS_ICONTEXT_BASE: null }
    );
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
    renderer.render(
      GrandParent(
        {
          key: 'grandparent',
      }, [
        Layer({
          key: 'parent',
        }, [
          ContextLayer({
            key: 'innerLayer',
          }, [], {
            __EXTENDS_ICONTEXT_BASE: null,
          }),
        ]),
      ]),
      { __EXTENDS_ICONTEXT_BASE: null }
    );
    const loggerAfterGrandparentInit = new Logger(
      logger.logs.slice(2)
    );
    loggerAfterGrandparentInit.partialMatchWithmessage('loggerAfterGrandparentInit', [
      new LogItem({ blueprint: _Layer, type: 'init' }),
      new LogItem({
        blueprint: _ContextLayer,
        type: 'init',
      }),
      new LogItem({
        blueprint: _ContextLayer,
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
        props: {
          key: 'grandparent',
        }
      }),
    ]);
    renderer.render(null, { __EXTENDS_ICONTEXT_BASE: null });
    const loggerAfterDeletion = new Logger(
      logger.logs.slice(7)
    );
    console.error('loggerAfterDeletion', loggerAfterDeletion);
    loggerAfterDeletion.partialMatchWithmessage('loggerAfterDeletion', [
      new LogItem({
        blueprint: _ContextLayer,
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
});
