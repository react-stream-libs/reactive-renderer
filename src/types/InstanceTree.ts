import { BaseBlueprint } from './BaseBlueprint';
import { BasePropsType } from './BasePropsType';
import { IParentableBy } from './IParentableBy';

export type InstanceTreeType<CommonBlueprintBase> = {
  instance: BaseBlueprint<BasePropsType> &
    IParentableBy<BaseBlueprint<BasePropsType>> &
    CommonBlueprintBase,
  key: string,
  childrenDict: {
    [key: string]: InstanceTreeType<CommonBlueprintBase>,
  },
  childrenList: Array<InstanceTreeType<CommonBlueprintBase>>,
};