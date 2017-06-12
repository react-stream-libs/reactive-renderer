import {
  forEach,
  isEqual,
} from 'lodash';
import {
  BaseBlueprint,
  BasePropsType,
  ICommonBlueprintBase,
  IContextBase,
} from '../..';

export default class Logger<ICommonBlueprint extends ICommonBlueprintBase> {
  public logs: LogItem<ICommonBlueprint>[];
  constructor(logs?: LogItem<ICommonBlueprint>[]) {
    this.logs = logs || [];
  }
  public add(logItem: LogItem<ICommonBlueprint>) {
    this.logs.push(logItem);
  }
  public partialMatch(partialLogItems: LogItem<ICommonBlueprint>[]) {
    forEach(
      partialLogItems,
      (value, key) => this.logs[key].partialMatch(value)
    );
  }
}

export type LogItemEventType = 'init' | 'update' | 'delete' | 'reorder';

export type LogItemDataType<ICommonBlueprint extends ICommonBlueprintBase> = {
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
export class LogItem<ICommonBlueprint extends ICommonBlueprintBase> {
  private data: LogItemDataType<ICommonBlueprint>;
  constructor(args: LogItemDataType<ICommonBlueprint>) {
    this.data = args;
  }
  public partialMatch(toMatch: LogItem<ICommonBlueprint>) {
    forEach(
      toMatch.data,
      (value, key) => {
        if (!isEqual(this.data[key], value)) {
          // FIXME: use stripMargins
          throw new Error(`
            LogItem Mismatch!
              value: ${value}
              key: ${key}
              this.data[key]: ${this.data[key]}
          `);
        }
      }
    );
  }
}
