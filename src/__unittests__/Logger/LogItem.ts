import {
  forEach,
  isEqual,
  sortBy,
  fromPairs,
  map,
} from 'lodash';
import {
  ICommonBlueprintBase,
} from '../..';

import { LogItemRawDataType } from './LogItemRawDataType';
import LogItemMismatchError from './LogItemMismatchError';
function sortObjectKeys(object: any) {
  const keys = Object.keys(object);
  const sortedKeys = sortBy(keys);

  return fromPairs(
    map(sortedKeys, key => [key, object[key]])
  );
}
export class LogItem<ICommonBlueprint extends ICommonBlueprintBase> {
  private data: LogItemRawDataType<ICommonBlueprint>;
  constructor(args: LogItemRawDataType<ICommonBlueprint>) {
    this.data = args;
  }
  public getPrintableData(): Partial<LogItemRawDataType<ICommonBlueprint>> {
    return sortObjectKeys({
      ...this.data,
      instance: null,
      blueprint: this.data.blueprint.name,
    });
  }
  public partialExpect(expected: LogItem<ICommonBlueprint>, message?: string) {
    forEach(
      expected.data,
      (expectedValue, key) => {
        if (!isEqual(this.data[key], expectedValue)) {
          // FIXME: use stripMargins
          throw new LogItemMismatchError({
            got: this,
            expected,
            diffKey: key,
            gotValue: this.data[key],
            expectedValue,
          });
        }
      }
    );
  }
}
