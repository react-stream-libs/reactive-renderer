import { BasePropsType } from './BasePropsType';

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
    oldChildrenList: BaseBlueprint<
      PropsType, CommonBlueprintBase
    > [],
    newChildrenList: BaseBlueprint<
      PropsType, CommonBlueprintBase
    > []
  ): void;
  public abstract cleanUp(): any;
}
