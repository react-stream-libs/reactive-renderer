import { RenderableType } from './types/Renderable';
import { BaseBlueprint } from './types/BaseBlueprint';
import { BasePropsType } from './types/BasePropsType';
import { IParentableBy } from './types/IParentableBy';
import { InstanceTreeType } from './types/InstanceTree';

import {
  forEach,
  every,
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
export function renderChild<ICommonBlueprintBase>(
  instanceTree: InstanceTreeType<ICommonBlueprintBase>,
  toRender: RenderableType<
    BasePropsType,
    BaseBlueprint<BasePropsType, ICommonBlueprintBase> &
      ICommonBlueprintBase,
    BaseBlueprint<BasePropsType, ICommonBlueprintBase> &
      ICommonBlueprintBase,
    ICommonBlueprintBase
  >
) {
  const newChildrenList: typeof instanceTree.childrenList = [];
  const newChildrenDict: typeof instanceTree.childrenDict = {};

  let childrenChanged = false;
  // CREATE, TRAVERSE, UPDATE
  toRender.children.forEach(
    (toRenderChild, nth) => {
      const toRenderChildKey = toRenderChild.props.key;
      let childInstanceTree = instanceTree.childrenDict[toRenderChildKey];
      if (!childInstanceTree) {
        const instance = new toRenderChild.blueprint();
        instance.init(instanceTree.instance);
        childInstanceTree = {
          instance,
          childrenDict: {},
          childrenList: [],
          key: toRenderChildKey,
        };
        childrenChanged = true;
      }
      newChildrenList.push(childInstanceTree);
      newChildrenDict[toRenderChildKey] = childInstanceTree;
      childInstanceTree.instance.updateBeforeChildren(toRenderChild.props);
      renderChild<ICommonBlueprintBase>(childInstanceTree, toRenderChild);
      childInstanceTree.instance.updateAfterChildren(toRenderChild.props);
    }
  );

  // REMOVE
  forEach(
    instanceTree.childrenDict,
    (oldChild, oldChildKey) => {
      if (!newChildrenDict[oldChildKey]) {
        deleteTree(oldChild);
        oldChild.instance.cleanUp();
        childrenChanged = true;
      }
    }
  );
  childrenChanged = childrenChanged || every(
    instanceTree.childrenList,
    (oldChild, nth) =>
      oldChild.key === (newChildrenList[nth] && newChildrenList[nth].key)
  );
  if (!childrenChanged) {
    instanceTree.instance.reorderChildren(
      instanceTree.childrenList,
      instanceTree.childrenDict,
      newChildrenList,
      newChildrenDict
    );
  }
  instanceTree.childrenDict = newChildrenDict;
  instanceTree.childrenList = newChildrenList;
}

export function deleteTree<CommonBlueprintBase>(
  instanceTree: InstanceTreeType<CommonBlueprintBase>
) {
  forEach(
    instanceTree.childrenList,
    child => {
      deleteTree(child);
    }
  ) ;
  instanceTree.instance.cleanUp();
  delete instanceTree.childrenDict;
  delete instanceTree.childrenList;
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
