import {
  createComponent,
  BasePropsType,
  IContextBase,
} from '../../..';

import { __GrandParent } from './Grandparent';
import Logger, { LogItem } from '../../Logger';
import { ICommonBlueprint } from '../ICommonBlueprint';

import {
  Blueprint,
  IParentableBy,
  RenderableType,
  InstanceTreeType,
} from './types';

export type _LayerParentTypes = __GrandParent & __Layer;
export type LayerPropsType = {
} & BasePropsType;

export class __Layer extends Blueprint<LayerPropsType, IContextBase>
    implements IParentableBy<_LayerParentTypes> {

  public someCommonMethod: () => '__Layer';
  public parent: _LayerParentTypes;
  protected logger: Logger<ICommonBlueprint>;
  public init(parent: _LayerParentTypes) { }
  public updateBeforeChildren(props: LayerPropsType) { }
  public updateAfterChildren(props: LayerPropsType) { }
  public reorderChildren(
    oldChildrenList: InstanceTreeType[],
    oldChildrenDict: {[key: string]: InstanceTreeType},
    newChildrenList: InstanceTreeType[],
    newChildrenDict: {[key: string]: InstanceTreeType},
  ) {

  }
  public cleanUp() { }
}

export function getLayerComps(logger: Logger<ICommonBlueprint>): {
  _Layer: typeof __Layer,
  Layer (
    props: LayerPropsType,
    children: RenderableType<
      BasePropsType,
      Blueprint<BasePropsType, IContextBase> & IParentableBy<__Layer>,
      __Layer,
      IContextBase
    >[]
  ): RenderableType<
    LayerPropsType,
    __Layer,
    _LayerParentTypes,
    IContextBase
  >
} {
  class _Layer extends __Layer implements ICommonBlueprint {
    constructor() {
      super();
      this.logger = logger;
    }
    public init(parent: _LayerParentTypes) {
      this.logger.add(new LogItem({
        instance: this,
        blueprint: _Layer,
        type: 'init',
      }));
    }
    public updateAfterChildren(props: LayerPropsType) {
      this.logger.add(new LogItem({
        instance: this,
        blueprint: _Layer,
        type: 'update',
        props,
      }));
    }
    public cleanUp() {
      this.logger.add(new LogItem({
        instance: this,
        blueprint: _Layer,
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
  const layerComponent = createComponent<
    _Layer,
    _LayerParentTypes,
    LayerPropsType,
    ICommonBlueprint
  >(_Layer);

  return {
    _Layer, Layer: layerComponent,
  };
}

export {
  RenderableType
};
