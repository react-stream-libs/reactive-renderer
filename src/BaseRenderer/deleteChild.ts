import {
  forEach,
} from 'lodash';

import {
  ICommonBlueprintBase,
  InstanceTreeType,
} from '../types';

export function deleteChild<ICommonBlueprint extends ICommonBlueprintBase>(
  instanceTree: InstanceTreeType<ICommonBlueprint>, childKey: string,
  renderCycleId: string | number,
) {
  const childToDelete = instanceTree.childrenDict[childKey];
  forEach(
    childToDelete.childrenDict,
    (childOfChild, key) => deleteChild(childToDelete, key, renderCycleId)
  );
  childToDelete.instance.cleanUp(renderCycleId);
  delete instanceTree.childrenDict[childKey];
}
