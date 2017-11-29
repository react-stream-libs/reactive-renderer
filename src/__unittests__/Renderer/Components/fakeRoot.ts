import Logger from '../../Logger';
import {
  IContextBase,
} from '../../..';

import {
  Blueprint,
  IParentableBy,
  createComponent,
  BasePropsType,
  _RenderableType,
  _IParentableBy,
  BaseBlueprint,
  InstanceTreeType,
} from './types';
import { ICommonBlueprint } from '../ICommonBlueprint';

export class NoneExistentBlueprint
    extends Blueprint<BasePropsType, IContextBase> {

  public init(parent: Blueprint<BasePropsType, IContextBase>): void {}

  public reorderChildren(
    oldChildrenList: InstanceTreeType[],
    oldChildrenDict: {[key: string]: InstanceTreeType},
    newChildrenList: InstanceTreeType[],
    newChildrenDict: {[key: string]: InstanceTreeType}
  ): void { }
  public updateBeforeChildren(props: BasePropsType): void {}
  public updateAfterChildren(props: BasePropsType): void {}
  public cleanUp(): void {}
}

export type FakeRootPropsType = {

} & BasePropsType;

export class _FakeRoot
    extends Blueprint<FakeRootPropsType, IContextBase>
    implements IParentableBy<NoneExistentBlueprint> {
  public someCommonMethod: () => 'hello';
  // @ts-ignore: ignore unused
  private logger: Logger<ICommonBlueprint> | undefined;
  constructor(logger?: Logger<ICommonBlueprint>) {
    super();
    this.logger = logger;
  }
  public init(parent: NoneExistentBlueprint): void { }
  public updateBeforeChildren(props: BasePropsType): void { }
  public updateAfterChildren(props: BasePropsType): void { }

  public reorderChildren(
    oldChildrenList: InstanceTreeType[],
    oldChildrenDict: {[key: string]: InstanceTreeType},
    newChildrenList: InstanceTreeType[],
    newChildrenDict: {[key: string]: InstanceTreeType},
  ): void { }
  public cleanUp(): void { }
}

/**
 * INTERNAL USE: Fake Root
 * @param props: FakeRoot props
 */
const fakeRoot = createComponent<
  _FakeRoot,
  NoneExistentBlueprint,
  FakeRootPropsType
> (_FakeRoot);

export default fakeRoot;

export {
  _RenderableType as RenderableType,
  _IParentableBy as IParentableBy,
  BaseBlueprint,
};
