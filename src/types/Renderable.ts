import { BaseBlueprint } from './BaseBlueprint';
import { BasePropsType } from './BasePropsType';
import { IParentableBy } from './IParentableBy';
import { IContextBase } from './IContextBase';
import { ICommonBlueprintBase } from './ICommonBlueprintBase';

export type RenderableType<
  PropsType extends BasePropsType,
  Blueprint extends
    BaseBlueprint<BasePropsType, CommonBlueprintBase, IContext> &
    CommonBlueprintBase,
  ParentableBy extends
    BaseBlueprint<BasePropsType, CommonBlueprintBase, IContextBase> &
    CommonBlueprintBase,
  CommonBlueprintBase extends ICommonBlueprintBase,
  IContext extends IContextBase
> = {
  // blueprint: { new(): Blueprint & IParentableBy<BaseBlueprint<BasePropsType>> },
  blueprint: {
    new(): Blueprint & IParentableBy<ParentableBy, CommonBlueprintBase>
  },
  // blueprint: {new(): Blueprint & IParentableBy<ParentableBlueprint>}
  props: PropsType,
  children: RenderableType<
    BasePropsType,
    BaseBlueprint<BasePropsType, CommonBlueprintBase, IContextBase> &
      IParentableBy<Blueprint, CommonBlueprintBase> & CommonBlueprintBase,
    Blueprint,
    CommonBlueprintBase,
    IContextBase
  > [],
  _parentables?: ParentableBy,
  context: IContext
};
