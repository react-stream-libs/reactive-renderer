import { BaseBlueprint } from './BaseBlueprint';
import { BasePropsType } from './BasePropsType';
import { IParentableBy } from './IParentableBy';

export type InstanceTreeType<ICommonBlueprintBase> = {
  instance: BaseBlueprint<BasePropsType, ICommonBlueprintBase> &
    IParentableBy<
      BaseBlueprint<BasePropsType, ICommonBlueprintBase>
      , ICommonBlueprintBase
    > &
    ICommonBlueprintBase,
  key: string,
  childrenDict: {
    [key: string]: InstanceTreeType<ICommonBlueprintBase>,
  },
  childrenList: InstanceTreeType<ICommonBlueprintBase>[],
};
