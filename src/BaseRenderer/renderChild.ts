import {
  forEach,
  every,
} from 'lodash';
import * as uuid from 'uuid';

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
    BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>,
    BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>
  >,
  context: IContext,
  renderCycleId: number | string = uuid.v4(),
) {
  const newChildrenList: typeof instanceTree.childrenList = [];
  const newChildrenDict: typeof instanceTree.childrenDict = {};

  const instance = instanceTree.instance;
  instance.__children = [];

  let childrenChanged = false;
  // CREATE, TRAVERSE, UPDATE
  toRender.children.forEach(
    (toRenderChild, nth) => {
      const toRenderChildKey = toRenderChild.props.key;
      const toRenderChildContext = toRenderChild.context;
      const toRenderChildProps = toRenderChild.props;
      let childInstanceTree = instanceTree.childrenDict[toRenderChildKey];
      if (!childInstanceTree) {
        const newChildInstance = new toRenderChild.blueprint();
        toRenderChildProps.beforeInit &&
          toRenderChildProps.beforeInit(newChildInstance, toRenderChildProps);
        newChildInstance.init(
          instanceTree.instance,
          toRenderChildProps,
          toRenderChildContext,
          renderCycleId,
        );
        toRenderChildProps.afterInit &&
          toRenderChildProps.afterInit(newChildInstance, toRenderChildProps);
        childInstanceTree = {
          instance: newChildInstance,
          childrenDict: {},
          childrenList: [],
          key: toRenderChildKey,
          context: toRenderChildContext,
        };
        childrenChanged = true;
      }
      instance.__children.push(childInstanceTree.instance);
      newChildrenList.push(childInstanceTree);
      newChildrenDict[toRenderChildKey] = childInstanceTree;
      toRenderChildProps.beforeChildrenUpdate &&
        toRenderChildProps.beforeChildrenUpdate(
          childInstanceTree.instance, toRenderChildProps
        );
      childInstanceTree.instance.updateBeforeChildren(
        toRenderChild.props, toRenderChildContext,
        renderCycleId,
      );
      renderChild<ICommonBlueprintBase, IContextBase>(
        childInstanceTree, toRenderChild, toRenderChild.context,
        renderCycleId,
      );
      childInstanceTree.instance.updateAfterChildren(
        toRenderChild.props, toRenderChildContext,
        renderCycleId,
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
        deleteTree(oldChild, renderCycleId);
        oldChild.instance.cleanUp(renderCycleId);
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
