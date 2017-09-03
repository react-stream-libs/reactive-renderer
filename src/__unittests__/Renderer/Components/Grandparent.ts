import {
  BasePropsType,
  createComponent,
  IContextBase,
  InstanceTreeType,
} from '../../..';

import { ICommonBlueprint } from '../ICommonBlueprint';
import { _FakeRoot } from './fakeRoot';

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
  public init(parent: _GrandparentParentTypes) { }
  public updateBeforeChildren(props: GrandParentPropsType) { }
  public updateAfterChildren(props: GrandParentPropsType) { }

  public reorderChildren(
    oldChildrenList: InstanceTreeType[],
    oldChildrenDict: {[key: string]: InstanceTreeType},
    newChildrenList: InstanceTreeType[],
    newChildrenDict: {[key: string]: InstanceTreeType},
  ) {

  }
  public cleanUp() { }
}


export function getGrandparentComps(logger: Logger): {
  _GrandParent: typeof __GrandParent,
  GrandParent (
    props: GrandParentPropsType,
    children: RenderableType<
      BasePropsType,
      Blueprint<BasePropsType, IContextBase> & IParentableBy<__GrandParent>,
      __GrandParent,
      IContextBase
    > []
  ): RenderableType<
    GrandParentPropsType,
    __GrandParent,
    _GrandparentParentTypes,
    IContextBase
  >
} {
  class _GrandParent extends __GrandParent {
    public name: string;
    constructor() {
      super();
      this.name = 'GrandParent';
      this.logger = logger;
    }
    public init(parent: _GrandparentParentTypes) {
      this.logger.add(new LogItem({
        instance: this,
        blueprint: _GrandParent,
        type: 'init',
      }));
    }
    public updateAfterChildren(props: GrandParentPropsType) {
      this.logger.add(new LogItem({
        instance: this,
        blueprint: _GrandParent,
        type: 'update',
        props,
      }));
    }
    public cleanUp() {
      this.logger.add(new LogItem({
        instance: this,
        blueprint: _GrandParent,
        type: 'delete',
      }));
    }
  }
  const grandParentComponent = createComponent<
    _GrandParent,
    _GrandparentParentTypes,
    GrandParentPropsType,
    ICommonBlueprint
  >(_GrandParent);

  return {
    _GrandParent,
    GrandParent: grandParentComponent,
  };
}

export {
  RenderableType
};
