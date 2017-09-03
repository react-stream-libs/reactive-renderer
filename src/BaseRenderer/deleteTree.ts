import {
  ICommonBlueprintBase,
  InstanceTreeType,
} from '../types';

import {
  forEach,
} from 'lodash';

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
