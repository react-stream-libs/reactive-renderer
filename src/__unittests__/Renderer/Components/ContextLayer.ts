import {
  createComponentWithContext,
  BasePropsType,
  IContextBase,
} from '../../..';

import { __GrandParent } from './Grandparent';
import { __Layer } from './Layer';
import Logger, { LogItem } from '../../Logger';
import { ICommonBlueprint } from '../ICommonBlueprint';

import {
  Blueprint,
  IParentableBy,
  RenderableType,
  InstanceTreeType,
} from './types';

export type _ContextLayerParentTypes = __GrandParent & __ContextLayer & __Layer;
export type ContextLayerPropsType = {
} & BasePropsType;

export interface IRequiredContext extends IContextBase {

}

export class __ContextLayer extends Blueprint<ContextLayerPropsType, IContextBase>
    implements IParentableBy<_ContextLayerParentTypes> {

  public someCommonMethod: () => '__Layer';
  public parent: _ContextLayerParentTypes;
  protected logger: Logger<ICommonBlueprint>;
  public init(parent: _ContextLayerParentTypes) { }
  public updateBeforeChildren(props: ContextLayerPropsType) { }
  public updateAfterChildren(props: ContextLayerPropsType) { }
  public reorderChildren(
    oldChildrenList: InstanceTreeType[],
    oldChildrenDict: {[key: string]: InstanceTreeType},
    newChildrenList: InstanceTreeType[],
    newChildrenDict: {[key: string]: InstanceTreeType},
  ) {

  }
  public cleanUp() { }
}

export function getContextLayerComponent(logger: Logger<ICommonBlueprint>): {
  _ContextLayer: typeof __ContextLayer,
  ContextLayer (
    props: ContextLayerPropsType,
    children: RenderableType<
      BasePropsType,
      Blueprint<BasePropsType, IContextBase> & IParentableBy<__ContextLayer>,
      __ContextLayer,
      IContextBase
    >[],
    context: IRequiredContext
  ): RenderableType<
    ContextLayerPropsType,
    __ContextLayer,
    _ContextLayerParentTypes,
    IContextBase
  >
} {
  class _ContextLayer extends __ContextLayer implements ICommonBlueprint {
    constructor() {
      super();
      this.logger = logger;
    }
    public init(parent: _ContextLayerParentTypes) {
      this.logger.add(new LogItem({
        instance: this,
        blueprint: _ContextLayer,
        type: 'init',
      }));
    }
    public updateAfterChildren(props: ContextLayerPropsType) {
      this.logger.add(new LogItem({
        instance: this,
        blueprint: _ContextLayer,
        type: 'update',
        props,
      }));
    }
    public cleanUp() {
      this.logger.add(new LogItem({
        instance: this,
        blueprint: _ContextLayer,
        type: 'delete',
      }));
    }
    public reorderChildren(
      oldChildrenList: InstanceTreeType[],
      oldChildrenDict: {[key: string]: InstanceTreeType},
      newChildrenList: InstanceTreeType[],
      newChildrenDict: {[key: string]: InstanceTreeType},
    ) {

    }
  }
  const contextLayerComponent = createComponentWithContext<
    _ContextLayer,
    _ContextLayerParentTypes,
    ContextLayerPropsType,
    ICommonBlueprint,
    IRequiredContext
  >(_ContextLayer);

  return {
    _ContextLayer, ContextLayer: contextLayerComponent,
  };
}

export {
  RenderableType
};
