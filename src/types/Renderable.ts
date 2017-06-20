import { BaseBlueprint } from './BaseBlueprint';
import { BasePropsType } from './BasePropsType';
import { IParentableBy } from './IParentableBy';
import { IContextBase } from './IContextBase';
import { ICommonBlueprintBase } from './ICommonBlueprintBase';

export class Renderable<
  PropsType extends BasePropsType,
  Blueprint extends
    BaseBlueprint<BasePropsType, ICommonBlueprint, IContext> &
    ICommonBlueprint,
  ParentableBy extends
    BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> &
    ICommonBlueprint,
  ICommonBlueprint extends ICommonBlueprintBase,
  IContext extends IContextBase
> {
  public blueprint: {
    new(): Blueprint & IParentableBy<ParentableBy, ICommonBlueprint>
  };
  public props: PropsType;
  public children: Renderable<
    BasePropsType,
    BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> &
      IParentableBy<Blueprint, ICommonBlueprint> & ICommonBlueprint,
    Blueprint,
    ICommonBlueprint,
    IContextBase
  > [];
  // tslint:disable variable-name
  public _parentables?: ParentableBy;
  public context: IContext;
  constructor(args: {
    blueprint: {
      new(): Blueprint & IParentableBy<ParentableBy, ICommonBlueprint>
    },
    props: PropsType,
    children: Renderable<
      BasePropsType,
      BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> &
        IParentableBy<Blueprint, ICommonBlueprint> & ICommonBlueprint,
      Blueprint,
      ICommonBlueprint,
      IContextBase
    > [],
    _parentables?: ParentableBy,
    context: IContext
  }) {
    this.blueprint = args.blueprint;
    this.props = args.props;
    this.children = args.children;
    this._parentables = args._parentables;
    this.context = args.context;
  }
}
