import {
  omit,
} from 'ramda';
import { getGrandparentComponent } from './Components/Grandparent';
import { getLayerComponent } from './Components/Layer';
import { getContextLayerComponent } from './Components/ContextLayer';
import Logger, {
  LogItem,
  LogItemEventType,
} from '../Logger';

import FakeRenderer from './FakeRenderer';

describe('[Renderer::renderCycleId]', () => {
  it('... should corrently keep track of cycleId', () => {
    const logger = new Logger();
    const { GrandParent, _GrandParent } = getGrandparentComponent(logger);
    const { Layer, _Layer } = getLayerComponent(logger);
    const { ContextLayer, _ContextLayer }  = getContextLayerComponent(logger);
    const renderer = new FakeRenderer(logger);
    const renderId0 = 'render-id-0';
    renderer.render(
      GrandParent({
        key: 'grandparent',
      }, []),
      { __EXTENDS_ICONTEXT_BASE: null},
      { key: 'root' },
      renderId0
    );
    logger.partialMatchWithMessage('renderCycle:0', [
      new LogItem({
        blueprint: _GrandParent,
        type: LogItemEventType.INIT,
        renderCycleId: renderId0,
      }),
      new LogItem({
        blueprint: _GrandParent,
        type: LogItemEventType.UPDATE_BEFORE_CHILDREN,
        renderCycleId: renderId0,
      }),
      new LogItem({
        blueprint: _GrandParent,
        type: LogItemEventType.UPDATE_AFTER_CHILDREN,
        renderCycleId: renderId0,
      }),
    ]);
    const renderId1 = 'render-id-1';
    renderer.render(
      GrandParent({
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
      { __EXTENDS_ICONTEXT_BASE: null },
      { key: 'root' },
      renderId1
    );
    const loggerAfterInit = new Logger(logger.logs.slice(3));
    loggerAfterInit.partialMatchWithMessage('loggerAfterGrandparentInit', [
      new LogItem({
        blueprint: _GrandParent,
        type: LogItemEventType.UPDATE_BEFORE_CHILDREN,
        renderCycleId: renderId1,
      }),
      new LogItem({
        blueprint: _Layer,
        type: LogItemEventType.INIT,
        renderCycleId: renderId1,
      }),
      new LogItem({
        blueprint: _ContextLayer,
        type: LogItemEventType.INIT,
        renderCycleId: renderId1,
      }),
      new LogItem({
        blueprint: _ContextLayer,
        type: LogItemEventType.UPDATE_BEFORE_CHILDREN,
        renderCycleId: renderId1,
      }),
      new LogItem({
        blueprint: _ContextLayer,
        type: LogItemEventType.UPDATE_AFTER_CHILDREN,
        renderCycleId: renderId1,
      }),
      new LogItem({
        blueprint: _Layer,
        type: LogItemEventType.UPDATE_AFTER_CHILDREN,
        renderCycleId: renderId1,
      }),
      new LogItem({
        blueprint: _GrandParent,
        type: LogItemEventType.UPDATE_AFTER_CHILDREN, // 'update',
      }),
    ], (logItem) => new LogItem(
      omit([
        'context',
        'props',
      ], logItem.data)
    ));
  });
});
