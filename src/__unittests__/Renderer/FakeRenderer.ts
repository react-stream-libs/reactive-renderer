import * as _ from 'lodash';
import Logger from '../Logger';
import BaseRenderer, {
  BaseRootRenderableType,
  render,
} from '../../Renderer';
import { InstanceTreeType } from '../../types/InstanceTree';
import FakeRoot, { _FakeRoot } from './Components/FakeRoot';

export default class FakeRenderer extends BaseRenderer<_FakeRoot> {
  logger: Logger;
  instanceTree: InstanceTreeType;
  constructor(logger: Logger) {
    super();
    this.logger = logger;
    this.instanceTree = {
      instance: new _FakeRoot(logger),
      children: {},
    };
  }
  render(toRender?: BaseRootRenderableType<_FakeRoot>) {
    const renderRoot = FakeRoot({
      key: '__FAKEROOT__',
    }, _.compact([
      toRender,
    ]));
    render(this.instanceTree, renderRoot);
  }
  dispose() { }
}