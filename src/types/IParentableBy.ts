import { BaseBlueprint } from '../types/BaseBlueprint';
import { BasePropsType } from '../types/BasePropsType';
export interface IParentableBy<
  ParentType extends BaseBlueprint<BasePropsType, CommonBlueprintBase>,
  CommonBlueprintBase,
> {
  init(parent: ParentType): any;
}
