import { BasePropsType } from './BasePropsType';
import { ICommonBlueprintBase } from './ICommonBlueprintBase';
import { IContextBase } from './IContextBase';
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
  , ICommonBlueprint extends ICommonBlueprintBase
  , IContext extends IContextBase
> {
  // tslint:disable variable-name
  public __children: BaseBlueprint<
    BasePropsType,
    ICommonBlueprint,
    IContextBase
  > [];
  // tslint:enable variable-name
  public prevProps?: BasePropsType;
  public applyInitialProps(
    props: PropsType, context: IContext,
    renderCycleId: number | string,
  ) { }
  public abstract updateBeforeChildren(
    props: PropsType, context: IContext,
    renderCycleId: number | string,
  ): any;
  public abstract updateAfterChildren(
    props: PropsType, context: IContext,
    renderCycleId: number | string,
  ): any;
  public abstract reorderChildren(
    oldChildrenList: InstanceTreeType<ICommonBlueprint>[],
    oldChildrenDict: {
      [key: string]: InstanceTreeType<ICommonBlueprint>,
    },
    newChildrenList: InstanceTreeType<ICommonBlueprint>[],
    newChildrenDict: {
      [key: string]: InstanceTreeType<ICommonBlueprint>,
    },
  ): void;
  public abstract cleanUp(
    renderCycleId: number | string,
  ): any;
}
