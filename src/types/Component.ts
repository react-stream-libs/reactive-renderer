import { BaseBlueprint, UnpackBaseBlueprint } from './BaseBlueprint';
import { BasePropsType } from './BasePropsType';
import { IParentableBy } from './IParentableBy';
import { ICommonBlueprintBase } from './ICommonBlueprintBase';
import { IContextBase } from './IContextBase';
import { Renderable } from './Renderable';
export type ComponentType<
  BlueprintClass extends BaseBlueprint<any, any, any>,
  ParentableTypes extends BaseBlueprint<any, UnpackBaseBlueprint<BlueprintClass>['ICommonBlueprint'], any>
> = (
  props: UnpackBaseBlueprint<BlueprintClass>['PropsType'],
  children: Renderable<
    BasePropsType,
    BaseBlueprint<BasePropsType, UnpackBaseBlueprint<BlueprintClass>['ICommonBlueprint'], IContextBase>
      & IParentableBy<BlueprintClass>,
    BlueprintClass
  > [],
  context?: UnpackBaseBlueprint<BlueprintClass>['IContext']
) => Renderable<
  UnpackBaseBlueprint<BlueprintClass>['PropsType'],
  BlueprintClass,
  ParentableTypes
>;

export type ComponentWithContextType<
  BlueprintClass extends BaseBlueprint<PropsType, ICommonBlueprint, IContextBase> &
    IParentableBy<ParentableTypes> &
    ICommonBlueprint,
  ParentableTypes extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>,
  PropsType extends BasePropsType,
  ICommonBlueprint extends ICommonBlueprintBase,
  IContext extends IContextBase = IContextBase
> = (
  props: PropsType,
  children: Renderable<
    BasePropsType,
    BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> &
      IParentableBy<BlueprintClass>,
    BlueprintClass
  > [],
  context: IContext
) => Renderable<
  PropsType,
  BlueprintClass & ICommonBlueprint,
  ParentableTypes & ICommonBlueprint
>;
