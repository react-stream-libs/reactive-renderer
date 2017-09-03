import { BaseBlueprint } from './BaseBlueprint';
import { BasePropsType } from './BasePropsType';
import { IContextBase } from './IContextBase';
import { ICommonBlueprintBase } from './ICommonBlueprintBase';
export interface IParentableBy<
  ParentType extends BaseBlueprint<
    BasePropsType
    , ICommonBlueprint
    , IContextBase
  >,
  ICommonBlueprint extends ICommonBlueprintBase,
> {
  init(parent: ParentType, props: BasePropsType, context: IContextBase): any;
}
