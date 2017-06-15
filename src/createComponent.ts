import { BaseBlueprint } from './types/BaseBlueprint';
import { BasePropsType } from './types/BasePropsType';
import { IParentableBy } from './types/IParentableBy';
import { RenderableType } from './types/Renderable';
import { ICommonBlueprintBase } from './types/ICommonBlueprintBase';
import { IContextBase } from './types/IContextBase';

/**
 * creates Component( Props => Renderable ) from a Blueprint Class.
 * @param blueprintClass - the blueprint class
 */

// FIXME: use createComponentWithContext instead of re-impl.
export const defaultContext: IContextBase = {
  __EXTENDS_ICONTEXT_BASE: null,
};

export type ComponentType<
  BlueprintClass extends BaseBlueprint<PropsType, ICommonBlueprint, IContextBase> &
    IParentableBy<ParentableTypes, ICommonBlueprint> &
    ICommonBlueprint,
  ParentableTypes extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>,
  PropsType extends BasePropsType,
  ICommonBlueprint extends ICommonBlueprintBase
> = (
  props: PropsType,
  children: RenderableType<
    BasePropsType,
    BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> &
      IParentableBy<BlueprintClass, ICommonBlueprint> &
      ICommonBlueprint,
    BlueprintClass,
    ICommonBlueprint,
    IContextBase
  > []) => RenderableType<
  PropsType,
  BlueprintClass & ICommonBlueprint,
  ParentableTypes & ICommonBlueprint,
  ICommonBlueprint,
  IContextBase
>;

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
