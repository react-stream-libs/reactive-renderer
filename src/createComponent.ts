import { BaseBlueprint } from './types/BaseBlueprint';
import { BasePropsType } from './types/BasePropsType';
import { IParentableBy } from './types/IParentableBy';
import { RenderableType } from './types/Renderable';

/**
 * creates Component( Props => Renderable ) from a Blueprint Class.
 * @param blueprintClass - the blueprint class
 */
export function createComponent<
  BlueprintClass extends BaseBlueprint<PropsType> &
    IParentableBy<ParentableTypes> &
    CommonBlueprintBase
  ,
  ParentableTypes extends BaseBlueprint<BasePropsType>,
  PropsType extends BasePropsType,
  CommonBlueprintBase
>(
  blueprintClass: {
    new(): BlueprintClass & IParentableBy<ParentableTypes>
  },
) {
  return function _componentMetaData(
    props: PropsType,
    children: Array<
      RenderableType<
        BasePropsType,
        BaseBlueprint<BasePropsType> &
          IParentableBy<BlueprintClass> &
          CommonBlueprintBase,
        BlueprintClass,
        CommonBlueprintBase
      >
    >
  ): RenderableType<
    PropsType,
    BlueprintClass & CommonBlueprintBase,
    ParentableTypes & CommonBlueprintBase,
    CommonBlueprintBase
  > {
    return {
      blueprint: blueprintClass,
      props,
      children,
    };
  }
}