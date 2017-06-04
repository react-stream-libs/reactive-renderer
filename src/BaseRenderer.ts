import { RenderableType } from './types/Renderable';
import { BaseBlueprint } from './types/BaseBlueprint';
import { BasePropsType } from './types/BasePropsType';
import { IParentableBy } from './types/IParentableBy';
import { InstanceTreeType } from './types/InstanceTree';

import {
  reduce,
  forEach,
} from 'lodash';

export type BaseRootRenderableType<
    _Root extends BaseBlueprint<BasePropsType, CommonBlueprintBase>,
    CommonBlueprintBase,
> = RenderableType<
  BasePropsType,
  BaseBlueprint<BasePropsType, CommonBlueprintBase> &
    IParentableBy<_Root, CommonBlueprintBase> &
    CommonBlueprintBase,
  _Root & CommonBlueprintBase,
  CommonBlueprintBase
>;

export abstract class BaseRenderer<
  RootType extends BaseBlueprint<RootPropsType, CommonBlueprintBase>
  , RootPropsType extends BasePropsType
  , CommonBlueprintBase
> {
  public abstract render(
    rootRenderable: BaseRootRenderableType<RootType, CommonBlueprintBase> | null,
    rootProps?: RootPropsType
  ): any;
  public abstract dispose(): any;
}

// FIXME: implement a loop-variant for speed up!
export function renderChild<CommonBlueprintBase>(
  instanceTree: InstanceTreeType<CommonBlueprintBase>,
  toRender: RenderableType<
    BasePropsType,
    BaseBlueprint<BasePropsType, CommonBlueprintBase> &
      CommonBlueprintBase,
    BaseBlueprint<BasePropsType, CommonBlueprintBase> &
      CommonBlueprintBase,
    CommonBlueprintBase
  >
) {
  const toRenderChildrenMap = reduce<
    RenderableType<
      BasePropsType,
      BaseBlueprint<BasePropsType, CommonBlueprintBase> &
        CommonBlueprintBase,
      BaseBlueprint<BasePropsType, CommonBlueprintBase> &
        CommonBlueprintBase,
      CommonBlueprintBase
    >,
    {
      [key: string]: RenderableType<
        BasePropsType,
        BaseBlueprint<BasePropsType, CommonBlueprintBase> &
          CommonBlueprintBase,
        BaseBlueprint<BasePropsType, CommonBlueprintBase> &
          CommonBlueprintBase,
        CommonBlueprintBase
      >
    }
  >(
    toRender.children,
    (mappedChildren, child) => {
      mappedChildren[child.props.key] = child;

      return mappedChildren;
    },
    {}
  );
  forEach(instanceTree.childrenDict, (instanceTreeChild, key) => {
    if (!toRenderChildrenMap[key]
      || !(instanceTreeChild.instance instanceof toRenderChildrenMap[key].blueprint)
    ) {
      deleteChild(instanceTree, key);
    }
  });
  forEach(toRender.children, (renderableChild, renderableChildKey) => {
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
      };
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
  forEach(
    childToDelete.childrenDict,
    (childOfChild, key) => deleteChild(childToDelete, key)
  );
  childToDelete.instance.cleanUp();
  delete instanceTree.childrenDict[childKey];
}

export default BaseRenderer;
