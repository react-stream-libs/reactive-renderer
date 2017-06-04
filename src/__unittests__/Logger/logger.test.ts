import * as chai from 'chai';
import {
  default as Logger,
  LogItem,
} from '.';
import { BaseBlueprint } from '../../types/BaseBlueprint';
import { BasePropsType } from '../../types/BasePropsType';

export interface ICommonBlueprintBase {

}

class RootBlueprint extends BaseBlueprint<BasePropsType, ICommonBlueprintBase> {
  public init(parent: BaseBlueprint<BasePropsType, ICommonBlueprintBase>) { }
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
