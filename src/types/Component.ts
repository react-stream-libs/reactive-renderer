import { BaseBlueprint } from './BaseBlueprint';
import { BasePropsType } from './BasePropsType';
import { IParentableBy } from './IParentableBy';
import { ICommonBlueprintBase } from './ICommonBlueprintBase';
import { IContextBase } from './IContextBase';
import { RenderableType } from './Renderable';
export type ComponentType<
  BlueprintClass extends BaseBlueprint<PropsType, ICommonBlueprint, IContextBase> &
    IParentableBy<ParentableTypes, ICommonBlueprint> &
    ICommonBlueprint,
  ParentableTypes extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>,
  PropsType extends BasePropsType,
  ICommonBlueprint extends ICommonBlueprintBase,
  IContext extends IContextBase = IContextBase
> = (
  props: PropsType,
  children: RenderableType<
    BasePropsType,
    BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> &
      IParentableBy<BlueprintClass, ICommonBlueprint> &
      ICommonBlueprint,
    BlueprintClass,
    ICommonBlueprint,
    IContextBase
  > [],
  context?: IContext
  ) => RenderableType<
  PropsType,
  BlueprintClass & ICommonBlueprint,
  ParentableTypes & ICommonBlueprint,
  ICommonBlueprint,
  IContext
>;

export type ComponentWithContextType<
  BlueprintClass extends BaseBlueprint<PropsType, ICommonBlueprint, IContextBase> &
    IParentableBy<ParentableTypes, ICommonBlueprint> &
    ICommonBlueprint,
  ParentableTypes extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>,
  PropsType extends BasePropsType,
  ICommonBlueprint extends ICommonBlueprintBase,
  IContext extends IContextBase = IContextBase
> = (
  props: PropsType,
  children: RenderableType<
    BasePropsType,
    BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> &
      IParentableBy<BlueprintClass, ICommonBlueprint> &
      ICommonBlueprint,
    BlueprintClass,
    ICommonBlueprint,
    IContextBase
  > [],
  context: IContext
  ) => RenderableType<
  PropsType,
  BlueprintClass & ICommonBlueprint,
  ParentableTypes & ICommonBlueprint,
  ICommonBlueprint,
  IContext
>;
