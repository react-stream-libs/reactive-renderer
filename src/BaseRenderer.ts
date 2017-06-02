import { RenderableType } from './types/Renderable';
import { BaseBlueprint } from './types/BaseBlueprint';
import { BasePropsType } from './types/BasePropsType';
import { IParentableBy } from './types/IParentableBy';
import { InstanceTreeType } from './types/InstanceTree';

import * as _ from 'lodash';

export type BaseRootRenderableType<
    _Root extends BaseBlueprint<BasePropsType>,
    CommonBlueprintBase,
> = RenderableType<
  BasePropsType,
  BaseBlueprint<BasePropsType> & IParentableBy<_Root> & CommonBlueprintBase,
  _Root & CommonBlueprintBase,
  CommonBlueprintBase
>

export abstract class BaseReactiveRenderer<
  RootType extends BaseBlueprint<RootPropsType>
  , RootPropsType extends BasePropsType
  , CommonBlueprintBase
> {
  abstract render(
    rootRenderable: BaseRootRenderableType<RootType, CommonBlueprintBase> | null,
    rootProps?: RootPropsType
  ): any;
  abstract dispose(): any;
}

// FIXME: implement a loop-variant for speed up!
export function renderChild<CommonBlueprintBase>(
  instanceTree: InstanceTreeType<CommonBlueprintBase>,
  toRender: RenderableType<
    BasePropsType,
    BaseBlueprint<BasePropsType> & CommonBlueprintBase,
    BaseBlueprint<BasePropsType> & CommonBlueprintBase,
    CommonBlueprintBase
  >
) {
  const toRenderChildrenMap = _.reduce<
    RenderableType<
      BasePropsType,
      BaseBlueprint<BasePropsType> & CommonBlueprintBase,
      BaseBlueprint<BasePropsType> & CommonBlueprintBase,
      CommonBlueprintBase
    >,
    {
      [key: string]: RenderableType<
        BasePropsType,
        BaseBlueprint<BasePropsType> & CommonBlueprintBase,
        BaseBlueprint<BasePropsType> & CommonBlueprintBase,
        CommonBlueprintBase
      >
    }
  >(
    toRender.children,
    (mappedChildren, child) => {
      mappedChildren[child.props.key] = child;
      return mappedChildren;
  }, {});
  _.forEach(instanceTree.childrenDict, (instanceTreeChild, key) => {
    if (!toRenderChildrenMap[key]
      || !(instanceTreeChild.instance instanceof toRenderChildrenMap[key].blueprint)
    ) {
      deleteChild(instanceTree, key);
    }
  });
  _.forEach(toRender.children, (renderableChild, renderableChildKey) => {
    const key = renderableChild.props.key;
    if (!instanceTree.childrenDict[key]) {
      const childInstance = new renderableChild.blueprint();
      childInstance.init(instanceTree.instance);
      childInstance.applyInitialProps(renderableChild.props);
      instanceTree.childrenDict[key] = {
        instance: childInstance,
        childrenDict: {},
        childrenList: [],
        key,
      }
    }
    const childInstanceTree = instanceTree.childrenDict[key];
    childInstanceTree.instance.updateBeforeChildren(renderableChild.props);
    renderChild<CommonBlueprintBase>(childInstanceTree, renderableChild);
    childInstanceTree.instance.updateAfterChildren(renderableChild.props);
  });

}

export function deleteChild<CommonBlueprintBase>(
  instanceTree: InstanceTreeType<CommonBlueprintBase>, childKey: string
) {
  const childToDelete = instanceTree.childrenDict[childKey];
  _.forEach(childToDelete.childrenDict,
    (childOfChild, key) => deleteChild(childToDelete, key)
  );
  childToDelete.instance.cleanUp();
  delete instanceTree.childrenDict[childKey];
}

export default BaseReactiveRenderer;