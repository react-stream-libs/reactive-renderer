import { ICommonBlueprintBase } from '../..';
import { LogItem } from './LogItem';
export default class LogItemMismatchError<
  ICommonBlueprint extends ICommonBlueprintBase
> extends Error {
  public got: LogItem<ICommonBlueprint>;
  public expected: LogItem<ICommonBlueprint>;
  public diffKey: string;
  public gotValue: any;
  public expectedValue: any;
  constructor(args: {
    got: LogItem<ICommonBlueprint>,
    expected: LogItem<ICommonBlueprint>,
    diffKey: string,
    gotValue: any,
    expectedValue: any,
  }) {
    let gotValue = args.gotValue;
    // if (gotValue instanceof Function) {
    if (gotValue instanceof Function) {
      gotValue = gotValue.name;
    }
    let expectedValue = args.expectedValue;
    // if (gotValue instanceof Function) {
    if (expectedValue instanceof Function) {
      expectedValue = expectedValue.name;
    }
    super(`LogItemMismatch:
           got: ${JSON.stringify(args.got.getPrintableData())}
      expected: ${JSON.stringify(args.expected.getPrintableData())}
       diffKey: ${args.diffKey}
      gotValue: ${gotValue}
 expectedValue: ${expectedValue}
    `);
    this.got = args.got;
    this.expected = args.expected;
    this.diffKey = args.diffKey;
    this.gotValue = args.gotValue;
    this.expectedValue = args.expectedValue;
  }
}
