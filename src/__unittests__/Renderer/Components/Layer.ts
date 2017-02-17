import { BaseBlueprint } from '../../../types/BaseBlueprint';
import { BasePropsType } from '../../../types/BasePropsType';
import { createComponent } from '../../../createComponent';
import { IParentableBy } from '../../../types/IParentableBy';
import { RenderableType } from '../../../types/Renderable';
import { __GrandParent } from './Grandparent';

import Logger, { LogItem } from '../../Logger';

export type _LayerParentTypes = __GrandParent & __Layer;
;
export type LayerPropsType = {
} & BasePropsType;

export class __Layer extends BaseBlueprint<LayerPropsType>
    implements IParentableBy<_LayerParentTypes> {
  parent: _LayerParentTypes;
  logger: Logger;
  init(parent: _LayerParentTypes) { }
  updateBeforeChildren(props: LayerPropsType) { }
  updateAfterChildren(props: LayerPropsType) { }
  cleanUp() { }
}


export function getLayerComps(logger: Logger): {
  _Layer: typeof __Layer,
  Layer: (
    props: LayerPropsType,
    children: Array<
      RenderableType<
        BasePropsType,
        BaseBlueprint<BasePropsType> & IParentableBy<__Layer>,
        __Layer
      >
    >
  ) => RenderableType<LayerPropsType, __Layer, _LayerParentTypes>
} {
  class _Layer extends __Layer {
    constructor() {
      super();
      this.logger = logger;
    }
    init(parent: _LayerParentTypes) {
      this.logger.add(new LogItem({
        instance: this,
        blueprint: _Layer,
        type: 'init',
      }));
    }
    updateAfterChildren(props: LayerPropsType) {
      this.logger.add(new LogItem({
        instance: this,
        blueprint: _Layer,
        type: 'update',
        props,
      }));
    }
    cleanUp() {
      this.logger.add(new LogItem({
        instance: this,
        blueprint: _Layer,
        type: 'delete',
      }));
    }
  }
  const Layer = createComponent<
    _Layer,
    _LayerParentTypes,
    LayerPropsType
  >(_Layer);
  return {
    _Layer, Layer,
  }
}

export {
  RenderableType
}