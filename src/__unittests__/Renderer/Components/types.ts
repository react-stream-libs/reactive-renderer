/**
 * example of hiding CommonBlueprintBase from type definitions.
 * re-defines somewhat-bloated types due to CommonBlueprintBase.
 */
import {
  BaseBlueprint,
  BasePropsType,
  IParentableBy as _IParentableBy,
  RenderableType as _RenderableType,
  createComponent as _createComponent,
  InstanceTreeType as _InstanceTreeType,
  BaseRootRenderableType,
} from '../../..';

import { _FakeRoot } from './fakeRoot';

import {
  default as _Logger,
  LogItem as _LogItem,
} from '../../Logger';

import { ICommonBlueprintBase } from '../CommonBlueprintBase';

export abstract class Blueprint<PropsType extends BasePropsType>
  extends BaseBlueprint<PropsType, ICommonBlueprintBase>
  implements ICommonBlueprintBase {
  // abstract someCommonMethod = () => string
  public someCommonMethod: () => string;
}

export interface IParentableBy<
  _Blueprint extends Blueprint<any>
> extends _IParentableBy<_Blueprint, ICommonBlueprintBase> {

}

export type RenderableType<
  PropsType extends BasePropsType,
  _Blueprint extends
    Blueprint<BasePropsType>,
  ParentableBy extends
    Blueprint<BasePropsType>
> = _RenderableType<PropsType, _Blueprint, ParentableBy, ICommonBlueprintBase>;

export class Logger extends _Logger<ICommonBlueprintBase> {}
export class LogItem extends _LogItem<ICommonBlueprintBase> {}

export function createComponent<
  BlueprintClass extends Blueprint<PropsType> &
    IParentableBy<ParentableTypes>
  ,
  ParentableTypes extends Blueprint<BasePropsType>,
  PropsType extends BasePropsType
>(
  blueprintClass: {
    new(): BlueprintClass & IParentableBy<ParentableTypes>
  },
) {
  return _createComponent(blueprintClass);
}

export type InstanceTreeType = _InstanceTreeType<ICommonBlueprintBase>;

export type RootRenderableType = BaseRootRenderableType<
  _FakeRoot, ICommonBlueprintBase
>;
export {
  BasePropsType,
  _RenderableType,
  _IParentableBy,
  BaseBlueprint,
};
