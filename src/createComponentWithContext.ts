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
) {
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
    context: IContext,
  ): RenderableType<
    PropsType,
    BlueprintClass & ICommonBlueprint,
    ParentableTypes & ICommonBlueprint,
    ICommonBlueprint,
    IContext
  > => ({
      blueprint: blueprintClass,
      props,
      children,
      context,
  });
}
