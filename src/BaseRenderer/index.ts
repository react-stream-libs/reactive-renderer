import {
  BaseBlueprint,
  BasePropsType,
  IParentableBy,
  Renderable,
  ICommonBlueprintBase,
  IContextBase,
} from '../types';

import { deleteTree } from './deleteTree';
import { deleteChild } from './deleteChild';
import { renderChild } from './renderChild';

export type BaseRootRenderableType<
    _Root extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContext>,
    ICommonBlueprint extends ICommonBlueprintBase,
    IContext extends IContextBase
> = Renderable<
  BasePropsType,
  BaseBlueprint<BasePropsType, ICommonBlueprint, IContext> &
    IParentableBy<_Root> &
    ICommonBlueprint,
  _Root & ICommonBlueprint
>;

export abstract class BaseRenderer<
  RootType extends BaseBlueprint<RootPropsType, ICommonBlueprint, IContext>
  , RootPropsType extends BasePropsType
  , ICommonBlueprint extends ICommonBlueprintBase
  , IContext extends IContextBase
> {
  public abstract render(
    rootRenderable: BaseRootRenderableType<
      RootType, ICommonBlueprint, IContext
    > | null,
    context: IContext,
    rootProps?: RootPropsType,
  ): any;
  public abstract dispose(): any;
}

// tslint:disable export-name
export default BaseRenderer;

export {
  deleteChild,
  deleteTree,
  renderChild,
};

