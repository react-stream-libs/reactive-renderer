/** Fake Root */
import * as _ from 'lodash';
import Logger from '../Logger';
import BaseRenderer, {
  BaseRootRenderableType,
  renderChild,
} from '../../BaseRenderer';
import { InstanceTreeType } from '../../types/InstanceTree';
import FakeRoot, { _FakeRoot, FakeRootPropsType } from './Components/FakeRoot';

import { CommonBlueprintBase } from './CommonBlueprintBase';
export default class FakeRenderer extends BaseRenderer<_FakeRoot, FakeRootPropsType, CommonBlueprintBase> {
  logger: Logger;
  instanceTree: InstanceTreeType<CommonBlueprintBase>;
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
  render(toRender: BaseRootRenderableType<_FakeRoot, CommonBlueprintBase> | null, rootProps?: FakeRootPropsType) {
    const renderRoot = FakeRoot({
      key: '__FAKEROOT__',
    }, _.compact([
      toRender,
    ]));
    renderChild(this.instanceTree, renderRoot);
  }
  dispose() { }
}