import { BaseBlueprint, UnpackBaseBlueprint } from './BaseBlueprint';
import { BasePropsType } from './BasePropsType';
import { IParentableBy } from './IParentableBy';
import { IContextBase } from './IContextBase';

export class Renderable<
  PropsType extends BasePropsType,
  Blueprint extends
    BaseBlueprint<BasePropsType, any, any>,
  ParentableBy extends
    BaseBlueprint<BasePropsType, UnpackBaseBlueprint<Blueprint>['ICommonBlueprint'], IContextBase>,
> {
  public blueprint: {
    new(): Blueprint & IParentableBy<ParentableBy> & UnpackBaseBlueprint<Blueprint>['ICommonBlueprint']
  };
  public props: PropsType;
  public children: Renderable<
    BasePropsType,
    BaseBlueprint<BasePropsType, UnpackBaseBlueprint<Blueprint>['ICommonBlueprint'], IContextBase> &
      IParentableBy<Blueprint>,
    Blueprint
  > [];
  // tslint:disable variable-name
  public _parentables?: ParentableBy;
  public context: UnpackBaseBlueprint<Blueprint>['IContext'];
  constructor(args: {
    blueprint: {
      new(): Blueprint & IParentableBy<ParentableBy>
    },
    props: PropsType,
    children: Renderable<
      BasePropsType,
      BaseBlueprint<BasePropsType, UnpackBaseBlueprint<Blueprint>['ICommonBlueprint'], IContextBase> &
        IParentableBy<Blueprint> & UnpackBaseBlueprint<Blueprint>['ICommonBlueprint'],
      Blueprint
    > [],
    _parentables?: ParentableBy,
    context: UnpackBaseBlueprint<Blueprint>['IContext']
  }) {
    this.blueprint = args.blueprint;
    this.props = args.props;
    this.children = args.children;
    this._parentables = args._parentables;
    this.context = args.context;
  }
}
