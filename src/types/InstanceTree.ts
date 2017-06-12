import { BaseBlueprint } from './BaseBlueprint';
import { BasePropsType } from './BasePropsType';
import { IParentableBy } from './IParentableBy';
import { IContextBase } from './IContextBase';
import { ICommonBlueprintBase } from './ICommonBlueprintBase';

export type InstanceTreeType<ICommonBlueprint extends ICommonBlueprintBase> = {
  instance: BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> &
    IParentableBy<
      BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>
      , ICommonBlueprint
    > &
    ICommonBlueprint,
  key: string,
  context: IContextBase,
  prevProps?: BasePropsType,
  childrenDict: {
    [key: string]: InstanceTreeType<ICommonBlueprint>,
  },
  childrenList: InstanceTreeType<ICommonBlueprint>[],
};
