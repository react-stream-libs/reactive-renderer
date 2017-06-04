import { BaseBlueprint } from './types/BaseBlueprint';
import { BasePropsType } from './types/BasePropsType';
import { IParentableBy } from './types/IParentableBy';
import { RenderableType } from './types/Renderable';

/**
 * creates Component( Props => Renderable ) from a Blueprint Class.
 * @param blueprintClass - the blueprint class
 */

export function createComponent<
  BlueprintClass extends BaseBlueprint<PropsType, CommonBlueprintBase> &
    IParentableBy<ParentableTypes, CommonBlueprintBase> &
    CommonBlueprintBase,
  ParentableTypes extends BaseBlueprint<BasePropsType, CommonBlueprintBase>,
  PropsType extends BasePropsType,
  CommonBlueprintBase
>(
  blueprintClass: {
    new(): BlueprintClass & IParentableBy<ParentableTypes, CommonBlueprintBase>
  },
) {
  return (
    props: PropsType,
    children: RenderableType<
      BasePropsType,
      BaseBlueprint<BasePropsType, CommonBlueprintBase> &
        IParentableBy<BlueprintClass, CommonBlueprintBase> &
        CommonBlueprintBase,
      BlueprintClass,
      CommonBlueprintBase
    > []
  ): RenderableType<
    PropsType,
    BlueprintClass & CommonBlueprintBase,
    ParentableTypes & CommonBlueprintBase,
    CommonBlueprintBase
  > => ({
      blueprint: blueprintClass,
      props,
      children,
  });
}
