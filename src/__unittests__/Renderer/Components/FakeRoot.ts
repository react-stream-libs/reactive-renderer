import Logger from '../../Logger';
import { createComponent } from '../../../createComponent';
import { BaseBlueprint } from '../../../types/BaseBlueprint';
import { BasePropsType } from '../../../types/BasePropsType';
import { IParentableBy } from '../../../types/IParentableBy';

export class _NoneExistentBlueprint extends BaseBlueprint<BasePropsType> {
  init(parent: BaseBlueprint<BasePropsType>) {}
  updateBeforeChildren(props: BasePropsType) {}
  updateAfterChildren(props: BasePropsType) {}
  delete() {}
}

export type FakeRootPropsType = {

} & BasePropsType;

export class _FakeRoot
    extends BaseBlueprint<FakeRootPropsType>
    implements IParentableBy<_NoneExistentBlueprint>
{
  logger: Logger;
  constructor(logger?: Logger) {
    super();
    this.logger = logger;
  }
  init(parent: _NoneExistentBlueprint) {

  }
  updateBeforeChildren(props: BasePropsType) { }
  updateAfterChildren(props: BasePropsType) { }
  delete() { }
}

export const FakeRoot = createComponent<
  _FakeRoot, _NoneExistentBlueprint, FakeRootPropsType
> (_FakeRoot);

export default FakeRoot;

import { RenderableType } from '../../../types/Renderable';

export { RenderableType }