import {
  BaseBlueprint,
  BasePropsType,
  IParentableBy,
  Renderable,
  ICommonBlueprintBase,
  IContextBase,
  ComponentWithContextType,
} from './types';
import { UnpackBaseBlueprint } from './types/BaseBlueprint';

/**
 * creates Component( Props => Renderable ) from a Blueprint Class.
 * @param blueprintClass - the blueprint class
 */

export function createComponentWithContext<
  BlueprintClass extends BaseBlueprint<any, any, any>
    & IParentableBy<ParentableTypes>,
  ParentableTypes
    extends BaseBlueprint<
              BasePropsType, 
              UnpackBaseBlueprint<BlueprintClass>['ICommonBlueprint'], 
              IContextBase
            >,
  IRequiredContext extends IContextBase
>(
  blueprintClass: {
    new(): BlueprintClass & IParentableBy<ParentableTypes>
  },
): ComponentWithContextType<
  BlueprintClass,
  ParentableTypes
> {
  return (
    props: UnpackBaseBlueprint<BlueprintClass>['PropsType'],
    children: Renderable<
      BasePropsType,
      BaseBlueprint<
        BasePropsType, 
        UnpackBaseBlueprint<BlueprintClass>['ICommonBlueprint'], 
        IContextBase
      > & IParentableBy<BlueprintClass>,
      BlueprintClass
    > [],
    context: UnpackBaseBlueprint<BlueprintClass>// IContext
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
