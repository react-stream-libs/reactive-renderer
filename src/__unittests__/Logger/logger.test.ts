import * as chai from 'chai';
import {
  default as Logger,
  LogItem,
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
      type: 'init',
      key: 'grandparent',
    }));
    logger.add(new LogItem({
      type: 'init',
      blueprint: RootBlueprint,
      props: {
        key: '123',
      }
    }));
    logger.partialMatch([
      new LogItem({
        type: 'init',
      }),
      new LogItem({
        type: 'init',
        blueprint: RootBlueprint
      })
    ]);
    chai.expect(() => {
      logger.partialMatch([
        new LogItem({
          type: 'init',
        }),
        new LogItem({
          type: 'update',
          blueprint: RootBlueprint
        })
      ]);
    }).to.throw();
  });
});
