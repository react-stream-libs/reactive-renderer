import { BaseBlueprint } from './BaseBlueprint';
import { BasePropsType } from './BasePropsType';
import { IParentableBy } from './IParentableBy';
import { IContextBase } from './IContextBase';
import { ICommonBlueprintBase } from './ICommonBlueprintBase';

export type InstanceTreeType<
  ICommonBlueprint
      extends ICommonBlueprintBase = ICommonBlueprintBase
  , Blueprint
      extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>
       = BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>
> = {
  instance: Blueprint &
    IParentableBy<
      Blueprint
      , ICommonBlueprint
    > &
    ICommonBlueprint,
  key: string,
  context: IContextBase,
  childrenDict: {
    [key: string]: InstanceTreeType<ICommonBlueprint>,
  },
  childrenList: InstanceTreeType<ICommonBlueprint>[],
};
