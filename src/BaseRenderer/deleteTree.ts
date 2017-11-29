import {
  ICommonBlueprintBase,
  InstanceTreeType,
} from '../types';

import {
  forEach,
} from 'lodash';

export function deleteTree<ICommonBlueprint extends ICommonBlueprintBase>(
  instanceTree: InstanceTreeType<ICommonBlueprint>,
  renderCycleId: string | number,
) {
  forEach(
    instanceTree.childrenList,
    child => {
      deleteTree(child, renderCycleId);
    }
  ) ;
  instanceTree.instance.cleanUp(renderCycleId);
  delete instanceTree.childrenDict;
  delete instanceTree.childrenList;
}
