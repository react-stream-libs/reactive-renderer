/**
 * example of hiding CommonBlueprintBase from type definitions.
 * re-defines somewhat-bloated types due to CommonBlueprintBase.
 */
import {
  BaseBlueprint,
  BasePropsType,
  IParentableBy as _IParentableBy,
  Renderable as _RenderableType,
  createComponent as _createComponent,
  InstanceTreeType as _InstanceTreeType,
  IContextBase,
  BaseRootRenderableType,
} from '../../..';

import { _FakeRoot } from './fakeRoot';

import {
  default as _Logger,
  LogItem as _LogItem,
} from '../../Logger';

import { ICommonBlueprint } from '../ICommonBlueprint';

export abstract class Blueprint<
  PropsType extends BasePropsType
  , IContext extends IContextBase
>
  extends BaseBlueprint<PropsType, ICommonBlueprint, IContext>
  implements ICommonBlueprint
{

  public __EXTENDS_ICOMMON_BLUEPRINT_BASE: null;
  // abstract someCommonMethod = () => string
  public someCommonMethod: () => string;
}

export interface IParentableBy<
  _Blueprint extends Blueprint<any, any>
> extends _IParentableBy<_Blueprint, ICommonBlueprint> {

}

export type RenderableType<
  PropsType extends BasePropsType,
  _Blueprint extends Blueprint<BasePropsType, IContext>,
  ParentableBy extends Blueprint<BasePropsType, IContextBase>,
  IContext extends IContextBase
> = _RenderableType<PropsType, _Blueprint, ParentableBy, ICommonBlueprint, IContext>;

export class Logger extends _Logger<ICommonBlueprint> {}
export class LogItem extends _LogItem<ICommonBlueprint> {}

export function createComponent<
  BlueprintClass extends Blueprint<PropsType, IContextBase> &
    IParentableBy<ParentableTypes>
  ,
  ParentableTypes extends Blueprint<BasePropsType, IContextBase>,
  PropsType extends BasePropsType
>(
  blueprintClass: {
    new(): BlueprintClass & IParentableBy<ParentableTypes>
  },
) {
  return _createComponent<
    BlueprintClass,
    ParentableTypes,
    PropsType,
    ICommonBlueprint
  >(blueprintClass);
}

export type InstanceTreeType = _InstanceTreeType<ICommonBlueprint>;

export type RootRenderableType = BaseRootRenderableType<
  _FakeRoot, ICommonBlueprint, IContextBase
>;
export {
  BasePropsType,
  _RenderableType,
  _IParentableBy,
  BaseBlueprint,
};
