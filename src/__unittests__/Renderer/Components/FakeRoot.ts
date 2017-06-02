import Logger from '../../Logger';
import { createComponent } from '../../../createComponent';
import { BaseBlueprint } from '../../../types/BaseBlueprint';
import { BasePropsType } from '../../../types/BasePropsType';
import { IParentableBy } from '../../../types/IParentableBy';
import { CommonBlueprintBase } from '../CommonBlueprintBase';

export class NoneExistentBlueprint extends BaseBlueprint<BasePropsType> {
  public init(parent: BaseBlueprint<BasePropsType>) {}
  public updateBeforeChildren(props: BasePropsType) {}
  public updateAfterChildren(props: BasePropsType) {}
  public cleanUp() {}
}

export type FakeRootPropsType = {

} & BasePropsType;

export class _FakeRoot
    extends BaseBlueprint<FakeRootPropsType>
    implements IParentableBy<NoneExistentBlueprint>, CommonBlueprintBase
{
  someCommonMethod: () => "hello";
  logger: Logger;
  constructor(logger?: Logger) {
    super();
    this.logger = logger;
  }
  init(parent: NoneExistentBlueprint) {

  }
  updateBeforeChildren(props: BasePropsType) { }
  updateAfterChildren(props: BasePropsType) { }
  cleanUp() { }
}

/**
 * INTERNAL USE: Fake Root
 * @param props: FakeRoot props
 */
export const FakeRoot = createComponent<
  _FakeRoot,
  NoneExistentBlueprint,
  FakeRootPropsType,
  CommonBlueprintBase
> (_FakeRoot);

export default FakeRoot;

import { RenderableType } from '../../../types/Renderable';

export { RenderableType }