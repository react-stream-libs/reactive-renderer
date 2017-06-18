import {
  BaseBlueprint,
  BasePropsType,
  IParentableBy,
  RenderableType,
  ICommonBlueprintBase,
  IContextBase,
  ComponentType,
} from './types';

/**
 * creates Component( Props => Renderable ) from a Blueprint Class.
 * @param blueprintClass - the blueprint class
 */

export const defaultContext: IContextBase = {
  __EXTENDS_ICONTEXT_BASE: null,
};

export function createComponent<
  BlueprintClass extends BaseBlueprint<PropsType, ICommonBlueprint, IContextBase> &
    IParentableBy<ParentableTypes, ICommonBlueprint> &
    ICommonBlueprint,
  ParentableTypes extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>,
  PropsType extends BasePropsType,
  ICommonBlueprint extends ICommonBlueprintBase
>(
  blueprintClass: {
    new(): BlueprintClass & IParentableBy<ParentableTypes, ICommonBlueprint>
  },
): ComponentType<
  BlueprintClass,
  ParentableTypes,
  PropsType,
  ICommonBlueprint
> {
  return (
    props: PropsType,
    children: RenderableType<
      BasePropsType,
      BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> &
        IParentableBy<BlueprintClass, ICommonBlueprint> &
        ICommonBlueprint,
      BlueprintClass,
      ICommonBlueprint,
      IContextBase
    > []
  ) => ({
      blueprint: blueprintClass,
      props,
      children,
      context: defaultContext,
  });
}
