import {
  BaseBlueprint,
  BasePropsType,
  ICommonBlueprintBase,
  IContextBase,
} from '../..';

export type LogItemEventType = 'init' | 'update' | 'delete' | 'reorder';

export type LogItemRawDataType<ICommonBlueprint extends ICommonBlueprintBase> = {
  [key: string]: BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>
   | typeof BaseBlueprint
   | string
   | BasePropsType;
  instance?: BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>,
  parentInstance?: BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>,
  blueprint?: typeof BaseBlueprint,
  key?: string,
  type: LogItemEventType,
  props?: BasePropsType,
};
