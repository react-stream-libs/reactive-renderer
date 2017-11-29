import { Enum } from 'typescript-string-enums';
import {
  BaseBlueprint,
  BasePropsType,
  ICommonBlueprintBase,
  IContextBase,
} from '../..';

// tslint:disable variable-name
export const LogItemEventType = Enum(
  'INIT',
  'UPDATE_BEFORE_CHILDREN',
  'UPDATE_AFTER_CHILDREN',
  'DELETE',
  'REORDER',
);
// tslint:enable
export type LogItemEventType = Enum<typeof LogItemEventType>;

export type LogItemRawDataType<ICommonBlueprint extends ICommonBlueprintBase> = {
  [key: string]: any;
  instance?: BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>,
  parentInstance?: BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>,
  blueprint?: new() => BaseBlueprint<BasePropsType, ICommonBlueprintBase, IContextBase>,
  key?: string,
  type: LogItemEventType,
  props?: BasePropsType,
  context?: IContextBase,
  renderCycleId?: number | string,
};
