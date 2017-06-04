import { BaseBlueprint } from './BaseBlueprint';
import { BasePropsType } from './BasePropsType';
import { IParentableBy } from './IParentableBy';

export type InstanceTreeType<CommonBlueprintBase> = {
  instance: BaseBlueprint<BasePropsType, CommonBlueprintBase> &
    IParentableBy<
      BaseBlueprint<BasePropsType, CommonBlueprintBase>
      , CommonBlueprintBase
    > &
    CommonBlueprintBase,
  key: string,
  childrenDict: {
    [key: string]: InstanceTreeType<CommonBlueprintBase>,
  },
  childrenList: InstanceTreeType<CommonBlueprintBase>[],
};
