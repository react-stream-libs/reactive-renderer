import {
  BaseBlueprint,
  BasePropsType,
  IParentableBy,
  Renderable,
  ICommonBlueprintBase,
  IContextBase,
  ComponentWithContextType,
} from './types';

/**
 * creates Component( Props => Renderable ) from a Blueprint Class.
 * @param blueprintClass - the blueprint class
 */

export function createComponentWithContext<
  BlueprintClass extends BaseBlueprint<PropsType, ICommonBlueprint, IContext>
    & IParentableBy<ParentableTypes, ICommonBlueprint>
    & ICommonBlueprint,
  ParentableTypes
    extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>
    & ICommonBlueprint,
  PropsType extends BasePropsType,
  ICommonBlueprint extends ICommonBlueprintBase,
  IContext extends IContextBase
>(
  blueprintClass: {
    new(): BlueprintClass & IParentableBy<ParentableTypes, ICommonBlueprint>
  },
): ComponentWithContextType<
  BlueprintClass,
  ParentableTypes,
  PropsType,
  ICommonBlueprint,
  IContext
> {
  return (
    props: PropsType,
    children: Renderable<
      BasePropsType,
      BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> &
        IParentableBy<BlueprintClass, ICommonBlueprint> &
        ICommonBlueprint,
      BlueprintClass,
      ICommonBlueprint,
      IContextBase
    > [],
    context: IContext
  ) => new Renderable<
    PropsType,
    BlueprintClass,
    ParentableTypes,
    ICommonBlueprint,
    IContext
  >({
      blueprint: blueprintClass,
      props,
      children,
      context,
  });
}
