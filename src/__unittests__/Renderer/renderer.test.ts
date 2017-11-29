import { omit } from 'ramda';
import { getGrandparentComponent } from './Components/Grandparent';
import { getLayerComponent } from './Components/Layer';
import { getContextLayerComponent } from './Components/ContextLayer';
import Logger, {
  LogItem,
  LogItemEventType,
} from '../Logger';

import FakeRenderer from './FakeRenderer';

describe('[Renderer]', () => {
  it('... should corrently init, update, and remove one-depth', () => {
    const logger = new Logger();
    const { GrandParent, _GrandParent } = getGrandparentComponent(logger);
    const { Layer, _Layer } = getLayerComponent(logger);
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
    logger.partialMatchWithMessage('', [
      new LogItem({
        blueprint: _GrandParent,
        type: LogItemEventType.INIT,
      }),
      new LogItem({
        blueprint: _GrandParent,
        type: LogItemEventType.UPDATE_BEFORE_CHILDREN,
      }),
      new LogItem({
        blueprint: _GrandParent,
        type: LogItemEventType.UPDATE_AFTER_CHILDREN,
      }),
    ]);
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
      { __EXTENDS_ICONTEXT_BASE: null }
    );
    const loggerAfterGrandparentInit = new Logger(
      logger.logs.slice(3)
    );
    // const loggerAfterGrandparentInit = logger;
    loggerAfterGrandparentInit.partialMatchWithMessage('loggerAfterGrandparentInit', [
      new LogItem({
        blueprint: _GrandParent,
        type: LogItemEventType.UPDATE_BEFORE_CHILDREN,
      }),
      new LogItem({
        blueprint: _Layer,
        type: LogItemEventType.INIT,
      }),
      new LogItem({
        blueprint: _ContextLayer,
        type: LogItemEventType.INIT,
      }),
      new LogItem({
        blueprint: _ContextLayer,
        type: LogItemEventType.UPDATE_BEFORE_CHILDREN,
        props: {
          key: 'innerLayer',
        }
      }),
      new LogItem({
        blueprint: _ContextLayer,
        type: LogItemEventType.UPDATE_AFTER_CHILDREN,
        props: {
          key: 'innerLayer',
        }
      }),
      new LogItem({
        blueprint: _Layer,
        type: LogItemEventType.UPDATE_AFTER_CHILDREN,
        props: {
          key: 'parent',
        }
      }),
      new LogItem({
        blueprint: _GrandParent,
        type: LogItemEventType.UPDATE_AFTER_CHILDREN,
        props: {
          key: 'grandparent',
        }
      }),
    ],
    (logItem) => new LogItem(
      omit([
        'context',
        'props',
        'renderCycleId',
      ], logItem.data)
    ));
    renderer.render(null, { __EXTENDS_ICONTEXT_BASE: null });
    const loggerAfterDeletion = new Logger(
      logger.logs.slice(10)
    );
    console.error('loggerAfterDeletion', loggerAfterDeletion);
    loggerAfterDeletion.partialMatchWithMessage('loggerAfterDeletion', [
      new LogItem({
        blueprint: _ContextLayer,
        type: LogItemEventType.DELETE,
      }),
      new LogItem({
        blueprint: _Layer,
        type: LogItemEventType.DELETE,
      }),
      new LogItem({
        blueprint: _GrandParent,
        type: LogItemEventType.DELETE,
      }),
    ]);
  });
});
