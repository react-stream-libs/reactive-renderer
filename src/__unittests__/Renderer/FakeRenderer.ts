/**
 * FakeRenderer
 */

import {
  compact,
} from 'lodash';
import BaseRenderer, {
  BaseRootRenderableType,
  renderChild,
} from '../../BaseRenderer';

import {
  InstanceTreeType,
  Logger,
} from './Components/types';
import fakeRoot, {
  _FakeRoot,
  FakeRootPropsType,
} from './Components/fakeRoot';

import { ICommonBlueprintBase } from './CommonBlueprintBase';
export default class FakeRenderer extends BaseRenderer<_FakeRoot, FakeRootPropsType, ICommonBlueprintBase> {
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
    };
  }
  public render(toRender: BaseRootRenderableType<_FakeRoot, ICommonBlueprintBase> | null, rootProps?: FakeRootPropsType) {
    const renderRoot = fakeRoot(
      {
        key: '__FAKEROOT__',
      },
      compact([toRender])
    );
    renderChild(this.instanceTree, renderRoot);
  }
  public dispose() { }
}
