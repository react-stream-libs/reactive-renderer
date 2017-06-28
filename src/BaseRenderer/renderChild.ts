import {
  forEach,
  every,
} from 'lodash';

import {
  BaseBlueprint,
  BasePropsType,
  Renderable,
  ICommonBlueprintBase,
  IContextBase,
  InstanceTreeType,
} from '../types';

import { deleteTree } from './deleteTree';


// FIXME: implement a loop-variant for speed up!
export function renderChild<
  ICommonBlueprint extends ICommonBlueprintBase
  , IContext extends IContextBase
>(
  instanceTree: InstanceTreeType<ICommonBlueprint>,
  toRender: Renderable<
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
        instance.init(instanceTree.instance, toRenderChildProps, toRenderChildContext);
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
      childInstanceTree.instance.prevProps = toRenderChildProps;
    }
  );

  // REMOVE
  forEach(
    instanceTree.childrenDict,
    (oldChild, oldChildKey) => {
      if (!newChildrenDict[oldChildKey]) {
        oldChild.instance.prevProps &&
          oldChild.instance.prevProps.beforeCleanup &&
            oldChild.instance.prevProps.beforeCleanup(oldChild.instance);
        deleteTree(oldChild);
        oldChild.instance.cleanUp();
        oldChild.instance.prevProps &&
          oldChild.instance.prevProps.afterCleanup &&
            oldChild.instance.prevProps.afterCleanup(oldChild.instance);
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
