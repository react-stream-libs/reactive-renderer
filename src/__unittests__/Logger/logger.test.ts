import * as chai from 'chai';
import {
  default as Logger,
  LogItem,
  LogItemEventType,
} from '.';
import {
  BaseBlueprint,
  BasePropsType,
  ICommonBlueprintBase,
  IContextBase,
} from '../..';

export interface ICommonBlueprint extends ICommonBlueprintBase {

}

class RootBlueprint extends BaseBlueprint<
  BasePropsType, ICommonBlueprint, IContextBase
> implements ICommonBlueprint {
  public __EXTENDS_ICOMMON_BLUEPRINT_BASE: null;
  public init(
    parent: BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>,
    context: IContextBase
  ) { }
  public updateBeforeChildren(props: BasePropsType) { }
  public updateAfterChildren(props: BasePropsType) { }

  public reorderChildren() { }
  public cleanUp() { }
}

describe('unittest logger should...', () => {
  it('should log correctly', () => {
    const logger = new Logger();
    logger.add(new LogItem({
      type: LogItemEventType.INIT,
      key: 'grandparent',
    }));
    logger.add(new LogItem({
      type: LogItemEventType.INIT,
      blueprint: RootBlueprint,
      props: {
        key: '123',
      }
    }));
    logger.partialMatchWithMessage('', [
      new LogItem({
        type: LogItemEventType.INIT,
      }),
      new LogItem({
        type: LogItemEventType.INIT,
        blueprint: RootBlueprint
      })
    ]);
    chai.expect(() => {
      logger.partialMatchWithMessage('', [
        new LogItem({
          type: LogItemEventType.INIT,
        }),
        new LogItem({
          type: LogItemEventType.UPDATE_AFTER_CHILDREN,
          blueprint: RootBlueprint
        })
      ]);
    }).to.throw();
  });
});
