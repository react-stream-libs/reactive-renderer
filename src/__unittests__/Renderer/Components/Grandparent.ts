import { BaseBlueprint } from '../../../types/BaseBlueprint';
import { BasePropsType } from '../../../types/BasePropsType';
import { createComponent } from '../../../createComponent';
import { IParentableBy } from '../../../types/IParentableBy';
import { RenderableType } from '../../../types/Renderable';
import { CommonBlueprintBase } from '../CommonBlueprintBase';
import { _FakeRoot } from './FakeRoot';

import Logger, { LogItem } from '../../Logger';

export type _GrandparentParentTypes = _FakeRoot;
;
export type GrandParentPropsType = {
} & BasePropsType;

export class __GrandParent extends BaseBlueprint<GrandParentPropsType>
    implements IParentableBy<_GrandparentParentTypes>, CommonBlueprintBase {

  someCommonMethod: () => '__GrandParent';
  parent: _GrandparentParentTypes;
  logger: Logger;
  init(parent: _GrandparentParentTypes) { }
  updateBeforeChildren(props: GrandParentPropsType) { }
  updateAfterChildren(props: GrandParentPropsType) { }
  cleanUp() { }
}


export function getGrandparentComps(logger: Logger): {
  _GrandParent: typeof __GrandParent,
  GrandParent: (
    props: GrandParentPropsType,
    children: Array<
      RenderableType<
        BasePropsType,
        BaseBlueprint<BasePropsType> &
          IParentableBy<__GrandParent> &
          CommonBlueprintBase,
        __GrandParent,
        CommonBlueprintBase
      >
    >
  ) => RenderableType<
    GrandParentPropsType,
    __GrandParent,
    _GrandparentParentTypes,
    CommonBlueprintBase
  >
} {
  class _GrandParent extends __GrandParent {
    name: string;
    constructor() {
      super();
      this.name = 'GrandParent';
      this.logger = logger;
    }
    init(parent: _GrandparentParentTypes) {
      this.logger.add(new LogItem({
        instance: this,
        blueprint: _GrandParent,
        type: 'init',
      }));
    }
    updateAfterChildren(props: GrandParentPropsType) {
      this.logger.add(new LogItem({
        instance: this,
        blueprint: _GrandParent,
        type: 'update',
        props,
      }));
    }
    cleanUp() {
      this.logger.add(new LogItem({
        instance: this,
        blueprint: _GrandParent,
        type: 'delete',
      }));
    }
  }
  const GrandParent = createComponent<
    _GrandParent,
    _GrandparentParentTypes,
    GrandParentPropsType,
    CommonBlueprintBase
  >(_GrandParent);
  return {
    _GrandParent, GrandParent,
  }
}

export {
  RenderableType
}