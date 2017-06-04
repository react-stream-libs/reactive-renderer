import { BasePropsType } from '../../../types/BasePropsType';
import { createComponent } from '../../../createComponent';
import { ICommonBlueprintBase } from '../CommonBlueprintBase';
import { __Layer } from './Layer';

import {
  Blueprint,
  IParentableBy,
  Logger, LogItem,
  RenderableType,
} from './types';

export type _ChildParentTypes = __Layer;
export type ChildPropsType = {
} & BasePropsType;

export class __Child extends Blueprint<ChildPropsType>
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
    oldChildrenList: Blueprint<BasePropsType>[],
    newChildrenList: Blueprint<BasePropsType>[]
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
      Blueprint<BasePropsType> &
        IParentableBy<__Child> &
        ICommonBlueprintBase,
      __Child
    > []
  ): RenderableType<
    ChildPropsType,
    __Child,
    _ChildParentTypes
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
    ICommonBlueprintBase
  >(_Child);

  return {
    _Child, Child: childComponent,
  };
}

export {
  RenderableType
};
