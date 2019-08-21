import {
  BasePropsType,
  createComponent,
  IContextBase,
  InstanceTreeType,
} from '../../..';

import { _FakeRoot } from './fakeRoot';
import {
  LogItemEventType,
} from '../../Logger/LogItemRawDataType';

import {
  Blueprint,
  IParentableBy,
  RenderableType,
  Logger, LogItem,
} from './types';

export type _GrandparentParentTypes = _FakeRoot;

export type GrandParentPropsType = {
} & BasePropsType;

export class __GrandParent
    extends Blueprint<GrandParentPropsType, IContextBase>
    implements
      IParentableBy<_GrandparentParentTypes> {
  public name: string;
  public someCommonMethod: () => '__GrandParent';
  protected parent: _GrandparentParentTypes;
  protected logger: Logger;
  public init(
    parent: _GrandparentParentTypes,
    props: GrandParentPropsType,
    context: IContextBase,
    renderCycleId?: string | number,
  ) { }
  public updateBeforeChildren(
    props: GrandParentPropsType,
    context: IContextBase,
    renderCycleId: number | string,
  ) { }
  public updateAfterChildren(
    props: GrandParentPropsType,
    context: IContextBase,
    renderCycleId: number | string,
  ) { }

  public reorderChildren(
    oldChildrenList: InstanceTreeType[],
    oldChildrenDict: {[key: string]: InstanceTreeType},
    newChildrenList: InstanceTreeType[],
    newChildrenDict: {[key: string]: InstanceTreeType},
  ) {

  }
  public cleanUp() { }
}


export function getGrandparentComponent(logger: Logger): {
  _GrandParent: typeof __GrandParent,
  GrandParent (
    props: GrandParentPropsType,
    children: RenderableType<
      BasePropsType,
      Blueprint<BasePropsType, IContextBase> & IParentableBy<__GrandParent>,
      __GrandParent
    > []
  ): RenderableType<
    GrandParentPropsType,
    __GrandParent,
    _GrandparentParentTypes
  >
} {
  class _GrandParent extends __GrandParent {
    public name: string;
    constructor() {
      super();
      this.name = 'GrandParent';
      this.logger = logger;
    }
    public init(
      parent: _GrandparentParentTypes,
      props: GrandParentPropsType,
      context: IContextBase,
      renderCycleId?: string | number,
    ) {
      this.logger.add(new LogItem({
        instance: this,
        blueprint: _GrandParent,
        type: LogItemEventType.INIT,
        props,
        context,
        renderCycleId,
      }));
    }
    public updateBeforeChildren(
      props: GrandParentPropsType,
      context: IContextBase,
      renderCycleId: number | string,
    ) {
      this.logger.add(new LogItem({
        instance: this,
        blueprint: _GrandParent,
        type: LogItemEventType.UPDATE_BEFORE_CHILDREN,
        props,
        context,
        renderCycleId,
      }));
    }
    public updateAfterChildren(
      props: GrandParentPropsType,
      context: IContextBase,
      renderCycleId: number | string,
    ) {
      this.logger.add(new LogItem({
        instance: this,
        blueprint: _GrandParent,
        type: LogItemEventType.UPDATE_AFTER_CHILDREN,
        props,
        context,
        renderCycleId,
      }));
    }
    public cleanUp() {
      this.logger.add(new LogItem({
        instance: this,
        blueprint: _GrandParent,
        type: LogItemEventType.DELETE,
      }));
    }
  }
  const grandParentComponent = createComponent<
    _GrandParent,
    _GrandparentParentTypes
  >(_GrandParent);

  return {
    _GrandParent,
    GrandParent: grandParentComponent,
  };
}

export {
  RenderableType
};
