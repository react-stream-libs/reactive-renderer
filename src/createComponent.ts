import {
  BaseBlueprint,
  BasePropsType,
  IParentableBy,
  Renderable,
  IContextBase,
  ComponentType,
} from './types';
import { UnpackBaseBlueprint } from './types/BaseBlueprint';

/**
 * creates Component( Props => Renderable ) from a Blueprint Class.
 * @param blueprintClass - the blueprint class
 */

export const defaultContext: IContextBase = {
  __EXTENDS_ICONTEXT_BASE: null,
};

export function createComponent<
  BlueprintClass extends BaseBlueprint<any, any, any> &
    IParentableBy<ParentableTypes>,
  ParentableTypes extends
    BaseBlueprint<BasePropsType, UnpackBaseBlueprint<BlueprintClass>['ICommonBlueprint'], IContextBase>
>(
  blueprintClass: {
    new(): BlueprintClass & IParentableBy<ParentableTypes>
  },
): ComponentType<
  BlueprintClass,
  ParentableTypes
> {
  return (
    props: UnpackBaseBlueprint<BlueprintClass>['PropsType'],
    children: Renderable<
      BasePropsType,
      BaseBlueprint<BasePropsType, UnpackBaseBlueprint<BlueprintClass>['ICommonBlueprint'], IContextBase> &
        IParentableBy<BlueprintClass>,
      BlueprintClass
    > []
  ) => new Renderable<
    UnpackBaseBlueprint<BlueprintClass>['PropsType'],
    BlueprintClass,
    ParentableTypes
  >({
      blueprint: blueprintClass,
      props,
      children,
      context: defaultContext,
  });
}
