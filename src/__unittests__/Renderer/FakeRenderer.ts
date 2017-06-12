/**
 * FakeRenderer
 */

import {
  compact,
} from 'lodash';
import {
  BaseRenderer,
  renderChild,
  IContextBase,
} from '../..';
import { ICommonBlueprint } from './ICommonBlueprint';
import {
  InstanceTreeType,
  Logger,
  RootRenderableType,
} from './Components/types';
import fakeRoot, {
  _FakeRoot,
  FakeRootPropsType,
} from './Components/fakeRoot';

export interface IFakeRootContext extends IContextBase {

}
export default class FakeRenderer extends BaseRenderer<
  _FakeRoot
  , FakeRootPropsType
  , ICommonBlueprint
  , IFakeRootContext
> {
  public logger: Logger;
  public instanceTree: InstanceTreeType;
  constructor(logger: Logger) {
    super();
    this.logger = logger;
    this.instanceTree = {
      instance: new _FakeRoot(logger),
      key: 'FAKE_RENDERER',
      childrenDict: {},
      childrenList: [],
      context: {
        __EXTENDS_ICONTEXT_BASE: null,
      },
    };
  }
  public render(
    toRender: RootRenderableType | null,
    context: IFakeRootContext,
    rootProps?: FakeRootPropsType
  ) {
    const renderRoot = fakeRoot(
      {
        key: '__FAKEROOT__',
      },
      compact([toRender])
    );
    renderChild(this.instanceTree, renderRoot, context);
  }
  public dispose() { }
}
