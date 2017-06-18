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

export function createComponentWithContext<
  BlueprintClass extends BaseBlueprint<PropsType, ICommonBlueprint, IContext> &
    IParentableBy<ParentableTypes, ICommonBlueprint> &
    ICommonBlueprint,
  ParentableTypes extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>,
  PropsType extends BasePropsType,
  ICommonBlueprint extends ICommonBlueprintBase,
  IContext extends IContextBase
>(
  blueprintClass: {
    new(): BlueprintClass & IParentableBy<ParentableTypes, ICommonBlueprint>
  },
): ComponentType<
  BlueprintClass,
  ParentableTypes,
  PropsType,
  ICommonBlueprint,
  IContext
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
    > [],
    context: IContext
  ) => ({
      blueprint: blueprintClass,
      props,
      children,
      context,
  });
}
