import { BasePropsType } from './BasePropsType';
import { InstanceTreeType } from './InstanceTree';

/**
 * @export
 * @abstract
 * @class BaseBlueprint
 * @template PropsType
 * @template CommonBlueprintBase
 */
export abstract class BaseBlueprint<
  PropsType extends BasePropsType
  , CommonBlueprintBase
> {
  public applyInitialProps(props: PropsType) { }
  public abstract updateBeforeChildren(props: PropsType): any;
  public abstract updateAfterChildren(props: PropsType): any;
  public abstract reorderChildren(
    oldChildrenList: InstanceTreeType<CommonBlueprintBase>[],
    oldChildrenDict: {
      [key: string]: InstanceTreeType<CommonBlueprintBase>,
    },
    newChildrenList: InstanceTreeType<CommonBlueprintBase>[],
    newChildrenDict: {
      [key: string]: InstanceTreeType<CommonBlueprintBase>,
    },
  ): void;
  public abstract cleanUp(): any;
}
