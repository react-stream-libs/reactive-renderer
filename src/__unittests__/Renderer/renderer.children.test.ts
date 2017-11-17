import {
  renderedForChildrenDiff,
  RenderedChildrenForDiffResultType,
} from './diffs/diffRenderedChildren';
import { getGrandparentComps } from './Components/Grandparent';
import { getLayerComps } from './Components/Layer';
import Logger from '../Logger';

import FakeRenderer from './FakeRenderer';

const emptyDiff: RenderedChildrenForDiffResultType = {
  missing: {},
  extra: {},
  unequal: {},
};

describe('[Renderer::children]', () => {
  it('... should have correct children', () => {
    const logger = new Logger();
    const { GrandParent } = getGrandparentComps(logger);
    const { Layer } = getLayerComps(logger);
    const renderer = new FakeRenderer(logger);
    renderer.render(
      GrandParent({
        key: 'grandparent'
      }, [
      ]),
      { __EXTENDS_ICONTEXT_BASE: null }
    );
    const rootInstance = renderer.instanceTree.instance;
    const grandParentInstance = rootInstance.__children[0];
    expect(
      renderedForChildrenDiff(grandParentInstance.__children, [])
    ).toEqual(emptyDiff);
    renderer.render(
      GrandParent({
        key: 'grandparent'
      }, [
        Layer({
          key: 'layer1',
        }, [])
      ]),
      { __EXTENDS_ICONTEXT_BASE: null }
    );
    expect(
      renderedForChildrenDiff(
        grandParentInstance.__children,
        [
          Layer({
            key: 'layer1',
          }, [])
        ]
      )
    ).toEqual(emptyDiff);
  });
});
