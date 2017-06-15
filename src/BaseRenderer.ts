import { RenderableType } from './types/Renderable';
import { BaseBlueprint } from './types/BaseBlueprint';
import { BasePropsType } from './types/BasePropsType';
import { IParentableBy } from './types/IParentableBy';
import { ICommonBlueprintBase } from './types/ICommonBlueprintBase';
import { IContextBase } from './types/IContextBase';
import { InstanceTreeType } from './types/InstanceTree';

import {
  forEach,
  every,
} from 'lodash';

export type BaseRootRenderableType<
    _Root extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContext>,
    ICommonBlueprint extends ICommonBlueprintBase,
    IContext extends IContextBase
> = RenderableType<
  BasePropsType,
  BaseBlueprint<BasePropsType, ICommonBlueprint, IContext> &
    IParentableBy<_Root, ICommonBlueprint> &
    ICommonBlueprint,
  _Root & ICommonBlueprint,
  ICommonBlueprint,
  IContext
>;

export abstract class BaseRenderer<
  RootType extends BaseBlueprint<RootPropsType, ICommonBlueprint, IContext>
  , RootPropsType extends BasePropsType
  , ICommonBlueprint extends ICommonBlueprintBase
  , IContext extends IContextBase
> {
  public abstract render(
    rootRenderable: BaseRootRenderableType<
      RootType, ICommonBlueprint, IContext
    > | null,
    context: IContext,
    rootProps?: RootPropsType,
  ): any;
  public abstract dispose(): any;
}

// FIXME: implement a loop-variant for speed up!
export function renderChild<
  ICommonBlueprint extends ICommonBlueprintBase
  , IContext extends IContextBase
>(
  instanceTree: InstanceTreeType<ICommonBlueprint>,
  toRender: RenderableType<
    BasePropsType,
    BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> &
      ICommonBlueprint,
    BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> &
      ICommonBlueprint,
    ICommonBlueprint,
    IContext
  >,
  context: IContext
) {
  const newChildrenList: typeof instanceTree.childrenList = [];
  const newChildrenDict: typeof instanceTree.childrenDict = {};

  let childrenChanged = false;
  // CREATE, TRAVERSE, UPDATE
  toRender.children.forEach(
    (toRenderChild, nth) => {
      const toRenderChildKey = toRenderChild.props.key;
      const toRenderChildContext = toRenderChild.context;
      const toRenderChildProps = toRenderChild.props;
      let childInstanceTree = instanceTree.childrenDict[toRenderChildKey];
      if (!childInstanceTree) {
        const instance = new toRenderChild.blueprint();
        toRenderChildProps.beforeInit &&
          toRenderChildProps.beforeInit(instance, toRenderChildProps);
        instance.init(instanceTree.instance, toRenderChildContext);
        toRenderChildProps.afterInit &&
          toRenderChildProps.afterInit(instance, toRenderChildProps);
        childInstanceTree = {
          instance,
          childrenDict: {},
          childrenList: [],
          key: toRenderChildKey,
          context: toRenderChildContext,
        };
        childrenChanged = true;
      }
      newChildrenList.push(childInstanceTree);
      newChildrenDict[toRenderChildKey] = childInstanceTree;
      toRenderChildProps.beforeChildrenUpdate &&
        toRenderChildProps.beforeChildrenUpdate(
          childInstanceTree.instance, toRenderChildProps
        );
      childInstanceTree.instance.updateBeforeChildren(
        toRenderChild.props, toRenderChildContext
      );
      renderChild<ICommonBlueprintBase, IContextBase>(
        childInstanceTree, toRenderChild, toRenderChild.context
      );
      childInstanceTree.instance.updateAfterChildren(
        toRenderChild.props,
        toRenderChildContext
      );
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

export function deleteTree<ICommonBlueprint extends ICommonBlueprintBase>(
  instanceTree: InstanceTreeType<ICommonBlueprint>
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
export function deleteChild<ICommonBlueprint extends ICommonBlueprintBase>(
  instanceTree: InstanceTreeType<ICommonBlueprint>, childKey: string
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
