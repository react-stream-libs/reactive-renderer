import {
  forEach,
} from 'lodash';

import {
  ICommonBlueprintBase,
  InstanceTreeType,
} from '../types';

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
