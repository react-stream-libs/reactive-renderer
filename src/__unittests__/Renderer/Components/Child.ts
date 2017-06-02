import { BaseBlueprint } from '../../../types/BaseBlueprint';
import { BasePropsType } from '../../../types/BasePropsType';
import { createComponent } from '../../../createComponent';
import { IParentableBy } from '../../../types/IParentableBy';
import { RenderableType } from '../../../types/Renderable';
import { CommonBlueprintBase } from '../CommonBlueprintBase';
import { __Layer } from './Layer';

import Logger, { LogItem } from '../../Logger';

export type _ChildParentTypes = __Layer;
export type ChildPropsType = {
} & BasePropsType;

export class __Child extends BaseBlueprint<ChildPropsType>
    implements IParentableBy<_ChildParentTypes>, CommonBlueprintBase {

  someCommonMethod: () => '__Child';
  parent: _ChildParentTypes;
  logger: Logger;
  init(parent: _ChildParentTypes) {
    this.logger.add(new LogItem({
      instance: this,
      blueprint: __Child,
      type: 'init',
    }));
  }
  updateBeforeChildren(props: ChildPropsType) {

  }
  updateAfterChildren(props: ChildPropsType) {
  }
  cleanUp() {
  }
}


export function getChildComps(logger: Logger): {
  _Child: typeof __Child,
  Child: (
    props: ChildPropsType,
    children: Array<
      RenderableType<
        BasePropsType,
        BaseBlueprint<BasePropsType> &
          IParentableBy<__Child> &
          CommonBlueprintBase,
        __Child,
        CommonBlueprintBase
      >
    >
  ) => RenderableType<
    ChildPropsType,
    __Child,
    _ChildParentTypes,
    CommonBlueprintBase
  >
} {
  class _Child extends __Child {
    constructor() {
      super();
      this.logger = logger;
    }
  }
  const Child = createComponent<
    _Child,
    _ChildParentTypes,
    ChildPropsType,
    CommonBlueprintBase
  >(_Child);
  return {
    _Child, Child,
  }
}

export {
  RenderableType
}