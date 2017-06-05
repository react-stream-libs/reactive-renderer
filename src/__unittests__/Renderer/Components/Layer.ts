import {
  createComponent,
  BasePropsType,
} from '../../..';

import { __GrandParent } from './Grandparent';
import Logger, { LogItem } from '../../Logger';
import { ICommonBlueprintBase } from '../CommonBlueprintBase';

import {
  Blueprint,
  IParentableBy,
  RenderableType,
  InstanceTreeType,
} from './types';

export type _LayerParentTypes = __GrandParent & __Layer;
export type LayerPropsType = {
} & BasePropsType;

export class __Layer extends Blueprint<LayerPropsType>
    implements IParentableBy<_LayerParentTypes> {

  public someCommonMethod: () => '__Layer';
  public parent: _LayerParentTypes;
  protected logger: Logger<ICommonBlueprintBase>;
  public init(parent: _LayerParentTypes) { }
  public updateBeforeChildren(props: LayerPropsType) { }
  public updateAfterChildren(props: LayerPropsType) { }
  public reorderChildren(
    oldChildrenList: InstanceTreeType[],
    newChildrenList: InstanceTreeType[]
  ) {

  }
  public cleanUp() { }
}

export function getLayerComps(logger: Logger<ICommonBlueprintBase>): {
  _Layer: typeof __Layer,
  Layer (
    props: LayerPropsType,
    children: RenderableType<
      BasePropsType,
      Blueprint<BasePropsType> & IParentableBy<__Layer>,
      __Layer
    >[]
  ): RenderableType<
    LayerPropsType,
    __Layer,
    _LayerParentTypes
  >
} {
  class _Layer extends __Layer implements ICommonBlueprintBase {
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
      newChildrenList: InstanceTreeType[]
    ) {

    }
  }
  const layerComponent = createComponent<
    _Layer,
    _LayerParentTypes,
    LayerPropsType,
    ICommonBlueprintBase
  >(_Layer);

  return {
    _Layer, Layer: layerComponent,
  };
}

export {
  RenderableType
};
