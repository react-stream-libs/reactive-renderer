import * as chai from 'chai';
import Logger, { LogItem } from '.';
import { BaseBlueprint } from '../../types/BaseBlueprint';
import { BasePropsType } from '../../types/BasePropsType';

class _Root extends BaseBlueprint<BasePropsType> {
  init(parent: BaseBlueprint<BasePropsType>) { }
  updateBeforeChildren(props: BasePropsType) { }
  updateAfterChildren(props: BasePropsType) { }
  cleanUp() { }
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
      blueprint: _Root,
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
        blueprint: _Root
      })
    ]);
    chai.expect(() => {
      logger.partialMatch([
        new LogItem({
          type: 'init',
        }),
        new LogItem({
          type: 'update',
          blueprint: _Root
        })
      ])
    }).to.throw();
  })
})