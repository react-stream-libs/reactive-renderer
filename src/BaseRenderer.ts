import { RenderableType } from './types/Renderable';
import { BaseBlueprint } from './types/BaseBlueprint';
import { BasePropsType } from './types/BasePropsType';
import { IParentableBy } from './types/IParentableBy';
import { InstanceTreeType } from './types/InstanceTree';

import * as _ from 'lodash';

export type BaseRootRenderableType<
    _Root extends BaseBlueprint<BasePropsType>
> = RenderableType<
  BasePropsType,
  BaseBlueprint<BasePropsType> & IParentableBy<_Root>,
  _Root
>

export abstract class BaseReactiveRenderer<
  RootType extends BaseBlueprint<BasePropsType>
> {
  abstract render(rootRenderable: BaseRootRenderableType<RootType>): any;
  abstract dispose(): any;
}

// FIXME: implement a loop-variant for speed up!
export function renderChild(
  instanceTree: InstanceTreeType,
  toRender: RenderableType<
    BasePropsType,
    BaseBlueprint<BasePropsType>,
    BaseBlueprint<BasePropsType>
  >
) {
  const toRenderChildrenMap = _.reduce<
    RenderableType<
      BasePropsType,
      BaseBlueprint<BasePropsType>,
      BaseBlueprint<BasePropsType>
    >,
    {
      [key: string]: RenderableType<
        BasePropsType,
        BaseBlueprint<BasePropsType>,
        BaseBlueprint<BasePropsType>
      >
    }
  >(
    toRender.children,
    (mappedChildren, child) => {
      mappedChildren[child.props.key] = child;
      return mappedChildren;
  }, {});
  _.forEach(instanceTree.children, (instanceTreeChild, key) => {
    if (!toRenderChildrenMap[key]
      || !(instanceTreeChild.instance instanceof toRenderChildrenMap[key].blueprint)
    ) {
      deleteChild(instanceTree, key);
    }
  });
  _.forEach(toRender.children, (renderableChild, renderableChildKey) => {
    const key = renderableChild.props.key;
    if (!instanceTree.children[key]) {
      const childInstance = new renderableChild.blueprint();
      childInstance.init(instanceTree.instance);
      instanceTree.children[key] = {
        instance: childInstance,
        children: {}
      }
    }
    const childInstanceTree = instanceTree.children[key];
    childInstanceTree.instance.updateBeforeChildren(renderableChild.props);
    renderChild(childInstanceTree, renderableChild);
    childInstanceTree.instance.updateAfterChildren(renderableChild.props);
  });

}

export function deleteChild(
  instanceTree: InstanceTreeType, childKey: string
) {
  const childToDelete = instanceTree.children[childKey];
  _.forEach(childToDelete.children,
    (childOfChild, key) => deleteChild(childToDelete, key)
  );
  childToDelete.instance.delete();
  delete instanceTree.children[childKey];
}

export default BaseReactiveRenderer;