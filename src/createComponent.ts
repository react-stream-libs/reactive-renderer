import { BaseBlueprint } from './types/BaseBlueprint';
import { BasePropsType } from './types/BasePropsType';
import { IParentableBy } from './types/IParentableBy';
import { RenderableType } from './types/Renderable';

/**
 * creates Component( Props => Renderable ) from a Blueprint Class.
 * @param blueprintClass - the blueprint class
 */
export function createComponent<
  BlueprintClass extends BaseBlueprint<PropsType> & IParentableBy<ParentableTypes>,
  ParentableTypes extends BaseBlueprint<BasePropsType>,
  PropsType extends BasePropsType
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
        BaseBlueprint<BasePropsType> & IParentableBy<BlueprintClass>,
        BlueprintClass
      >
    >
  ): RenderableType<PropsType, BlueprintClass, ParentableTypes> {
    return {
      blueprint: blueprintClass,
      props,
      children,
    };
  }
}