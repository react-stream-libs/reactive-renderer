import {
  createComponent,
  BasePropsType,
  IContextBase,
} from '../../..';

import { __GrandParent } from './Grandparent';
import Logger, {
  LogItem,
  LogItemEventType,
} from '../../Logger';
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
  public init(
    parent: _LayerParentTypes,
    props: LayerPropsType,
    context: IContextBase,
    renderCycleId: number | string
  ) { }
  public updateBeforeChildren(
    props: LayerPropsType,
    context: IContextBase,
    renderCycleId: number | string,
  ) { }
  public updateAfterChildren(
    props: LayerPropsType,
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
  public cleanUp(renderCycleId: string | number) { }
}

export function getLayerComponent(logger: Logger<ICommonBlueprint>): {
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
    public init(
      parent: _LayerParentTypes,
      props: LayerPropsType,
      context: IContextBase,
      renderCycleId?: string | number,
    ) {
      this.logger.add(new LogItem({
        instance: this,
        blueprint: _Layer,
        type: LogItemEventType.INIT,
        props,
        context,
        renderCycleId,
      }));
    }

    public updateAfterChildren(
      props: LayerPropsType,
      context: IContextBase,
      renderCycleId: number | string,
    ) {
      this.logger.add(new LogItem({
        instance: this,
        blueprint: _Layer,
        type: LogItemEventType
          .UPDATE_AFTER_CHILDREN,
        props,
        context,
        renderCycleId,
      }));
    }
    public cleanUp(renderCycleId: string | number) {
      this.logger.add(new LogItem({
        instance: this,
        blueprint: _Layer,
        type: LogItemEventType.DELETE,
        renderCycleId,
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
