import {
  forEach,
  isEqual,
} from 'lodash';
import {
  BaseBlueprint,
  BasePropsType,
} from '../..';

export default class Logger<CommonBlueprintBase> {
  public logs: LogItem<CommonBlueprintBase>[];
  constructor(logs?: LogItem<CommonBlueprintBase>[]) {
    this.logs = logs || [];
  }
  public add(logItem: LogItem<CommonBlueprintBase>) {
    this.logs.push(logItem);
  }
  public partialMatch(partialLogItems: LogItem<CommonBlueprintBase>[]) {
    forEach(
      partialLogItems,
      (value, key) => this.logs[key].partialMatch(value)
    );
  }
}

export type LogItemEventType = 'init' | 'update' | 'delete' | 'reorder';

export type LogItemDataType<CommonBlueprintBase> = {
  [key: string]: BaseBlueprint<BasePropsType, CommonBlueprintBase>
   | typeof BaseBlueprint
   | string
   | BasePropsType;
  instance?: BaseBlueprint<BasePropsType, CommonBlueprintBase>,
  parentInstance?: BaseBlueprint<BasePropsType, CommonBlueprintBase>,
  blueprint?: typeof BaseBlueprint,
  key?: string,
  type: LogItemEventType,
  props?: BasePropsType,
};
export class LogItem<CommonBlueprintBase> {
  private data: LogItemDataType<CommonBlueprintBase>;
  constructor(args: LogItemDataType<CommonBlueprintBase>) {
    this.data = args;
  }
  public partialMatch(toMatch: LogItem<CommonBlueprintBase>) {
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
