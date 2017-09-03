import {
  forEach,
} from 'lodash';
import * as stringTable from 'string-table';
import {
  ICommonBlueprintBase,
} from '../..';

import { LogItem } from './LogItem';
import LogItemMismatchError from './LogItemMismatchError';

export default class Logger<ICommonBlueprint extends ICommonBlueprintBase> { //tslint:disable export-name
  public logs: LogItem<ICommonBlueprint>[];
  constructor(logs?: LogItem<ICommonBlueprint>[]) {
    this.logs = logs || [];
  }
  public add(logItem: LogItem<ICommonBlueprint>) {
    this.logs.push(logItem);
  }
  public partialMatch(partialLogItems: LogItem<ICommonBlueprint>[], message?: string) {
    try {
      forEach(
        partialLogItems,
        (value, key) => this.logs[key].partialExpect(value, message)
      );
    } catch (e) {
      const error: LogItemMismatchError<ICommonBlueprint> = e;
      // FIXME: add Error class?
      const printableLogItems = this.logs.map(
        logItem => logItem.getPrintableData()
      );
      const expectedLogItems = partialLogItems.map(
        partialLogItem => partialLogItem.getPrintableData()
      );
      throw(new Error(`LoggerItemMismatch: ${message}
        Error: ${error}
        ${stringTable.create([{
          logItems: JSON.stringify(printableLogItems, null, 2),
          expected: JSON.stringify(expectedLogItems, null, 2),
        }], {
        })}
      `));
    }
  }
  // bad design below.
  public partialMatchWithmessage(message: string, partialLogItems: LogItem<ICommonBlueprint>[]) {
    this.partialMatch(partialLogItems, message);
  }
}

export {
  LogItem,
};
