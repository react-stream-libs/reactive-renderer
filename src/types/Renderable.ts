import { BaseBlueprint } from './BaseBlueprint';
import { BasePropsType } from './BasePropsType';
import { IParentableBy } from './IParentableBy';

export type RenderableType<
  PropsType extends BasePropsType,
  Blueprint extends
    BaseBlueprint<BasePropsType, CommonBlueprintBase> &
    CommonBlueprintBase,
  ParentableBy extends
    BaseBlueprint<BasePropsType, CommonBlueprintBase> &
    CommonBlueprintBase,
  CommonBlueprintBase
> = {
  // blueprint: { new(): Blueprint & IParentableBy<BaseBlueprint<BasePropsType>> },
  blueprint: {
    new(): Blueprint & IParentableBy<ParentableBy, CommonBlueprintBase>
  },
  // blueprint: {new(): Blueprint & IParentableBy<ParentableBlueprint>}
  props: PropsType,
  children: RenderableType<
    BasePropsType,
    BaseBlueprint<BasePropsType, CommonBlueprintBase> &
      IParentableBy<Blueprint, CommonBlueprintBase> & CommonBlueprintBase,
    Blueprint,
    CommonBlueprintBase
  > [],
  _parentables?: ParentableBy
};
