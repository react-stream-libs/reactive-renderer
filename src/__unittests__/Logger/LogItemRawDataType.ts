import {
  BaseBlueprint,
  BasePropsType,
  ICommonBlueprintBase,
  IContextBase,
} from '../..';

export type LogItemEventType = 'init' | 'update' | 'delete' | 'reorder';

export type LogItemRawDataType<ICommonBlueprint extends ICommonBlueprintBase> = {
  [key: string]: any;
  instance?: BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>,
  parentInstance?: BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>,
  blueprint?: new() => BaseBlueprint<BasePropsType, ICommonBlueprintBase, IContextBase>,
  key?: string,
  type: LogItemEventType,
  props?: BasePropsType,
};
