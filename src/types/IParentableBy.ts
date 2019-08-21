import { BaseBlueprint } from './BaseBlueprint';
import { BasePropsType } from './BasePropsType';
import { IContextBase } from './IContextBase';

export interface IParentableBy<
  ParentType extends BaseBlueprint<
    BasePropsType
    , any
    , IContextBase
  >
> {
  init(
    parent: ParentType,
    props: BasePropsType,
    context: IContextBase,
    renderCycleId?: string | number,
  ): any;
}
