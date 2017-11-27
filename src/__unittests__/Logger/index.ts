import {
  forEach,
} from 'lodash';
import * as stringTable from 'string-table';
import {
  ICommonBlueprintBase,
} from '../..';

import { LogItem } from './LogItem';
import { LogItemEventType } from './LogItemRawDataType';
import LogItemMismatchError from './LogItemMismatchError';

export default class Logger<ICommonBlueprint extends ICommonBlueprintBase> { //tslint:disable export-name
  public logs: LogItem<ICommonBlueprint>[];
  constructor(logs?: LogItem<ICommonBlueprint>[]) {
    this.logs = logs || [];
  }
  public add(logItem: LogItem<ICommonBlueprint>) {
    this.logs.push(logItem);
  }
  public partialMatchWithMessage(
    message: string,
    partialLogItems: LogItem<ICommonBlueprint>[],
    transformActual: (
      logItem: LogItem<ICommonBlueprint>,
    ) => LogItem<ICommonBlueprint>
      = (logItem) => logItem,
    transformExpected: (
      logItem: LogItem<ICommonBlueprint>
    ) => LogItem<ICommonBlueprint>
      = (logItem) => logItem,
  ) {
    try {
      forEach(
        partialLogItems,
        (value, key) => this.logs[key].partialExpect(value, message)
      );
    } catch (e) {
      const error: LogItemMismatchError<ICommonBlueprint> = e;
      // FIXME: add Error class?
      const actualLogItems = this.logs.map(
        logItem => transformActual(logItem).getPrintableData()
      );
      const expectedLogItems = partialLogItems.map(
        partialLogItem => transformExpected(partialLogItem).getPrintableData()
      );
      throw(new Error(`LoggerItemMismatch: ${message}
        Error: ${error}
        ${stringTable.create([{
          logItems: JSON.stringify(actualLogItems, null, 2),
          expected: JSON.stringify(expectedLogItems, null, 2),
        }], {
        })}
      `));
    }
  }
}

export {
  LogItem,
  LogItemEventType,
};
