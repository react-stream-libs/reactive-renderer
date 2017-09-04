import {
  BasePropsType,
  createComponent,
  IContextBase,
} from '../../../';
import { __Layer } from './Layer';

import { ICommonBlueprint } from '../ICommonBlueprint';

import {
  Blueprint,
  IParentableBy,
  Logger, LogItem,
  RenderableType,
  InstanceTreeType,
} from './types';

export type _ChildParentTypes = __Layer;
export type ChildPropsType = {
} & BasePropsType;

export class __Child extends Blueprint<ChildPropsType, IContextBase>
    implements IParentableBy<_ChildParentTypes> {
  public someCommonMethod: () => '__Child';
  public parent: _ChildParentTypes;
  protected logger: Logger;
  public init(parent: _ChildParentTypes) {
    this.logger.add(new LogItem({
      instance: this,
      blueprint: __Child,
      type: 'init',
    }));
  }
  public updateBeforeChildren(props: ChildPropsType) {

  }
  public updateAfterChildren(props: ChildPropsType) {
  }
  public reorderChildren(
    oldChildrenList: InstanceTreeType[],
    oldChildrenDict: {[key: string]: InstanceTreeType},
    newChildrenList: InstanceTreeType[],
    newChildrenDict: {[key: string]: InstanceTreeType},
  ) { }
  public cleanUp() {
  }
}

export function getChildComps(logger: Logger): {
  _Child: typeof __Child,
  Child (
    props: ChildPropsType,
    children: RenderableType<
      BasePropsType,
      Blueprint<BasePropsType, IContextBase> &
        IParentableBy<__Child> &
        ICommonBlueprint,
      __Child,
      IContextBase
    > []
  ): RenderableType<
    ChildPropsType,
    __Child,
    _ChildParentTypes,
    IContextBase
  >
} {
  class _Child extends __Child {
    constructor() {
      super();
      this.logger = logger;
    }
  }
  const childComponent = createComponent<
    _Child,
    _ChildParentTypes,
    ChildPropsType,
    ICommonBlueprint
  >(_Child);

  return {
    _Child, Child: childComponent,
  };
}

export {
  RenderableType
};
