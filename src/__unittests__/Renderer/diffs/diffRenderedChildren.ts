import {
  reduce,
  forEach,
  isEmpty,
} from 'lodash';
import {
  BasePropsType,
  Blueprint,
  RenderableType,
} from '../Components/types';
import {
  diffRenderedFor,
  RenderedForDiffResultType,
} from './diffRenderedFor';
export type RenderedChildrenForDiffResultType = {
  missing: {
    [key: string]: {
      blueprint: Blueprint, props: BasePropsType,
    },
  },
  extra: {
    [key: string]: {
      blueprint: new() => Blueprint, props: BasePropsType,
    }
  },
  unequal: {
    [key: string]: RenderedForDiffResultType,
  }
};
export type RenderedForDiffOptions = {
  allowPartialProps?: boolean,
};

export function renderedForChildrenDiff(
  actualInstances: Blueprint[],
  expectedRenderables: RenderableType[],
  options: RenderedForDiffOptions = {}
): RenderedChildrenForDiffResultType {
  const diff: RenderedChildrenForDiffResultType = {
    missing: {},
    extra: {},
    unequal: {},
  };
  const expectedMap = reduce<
    RenderableType,
    {
      [key: string]: RenderableType,
    }
  >(
    expectedRenderables,
    (result, value) => {
      result[value.props.key] = value;

      return result;
    },
    {}
  );
  const actualMap = reduce<
    Blueprint,
    {
      [key: string]: Blueprint,
    }
  > (
    actualInstances,
    (result, value) => {
      result[value.prevProps.key] = value;

      return result;
    },
    {}
  );

  forEach(
    expectedMap,
    (expected, key) => {
      const actualInstance = actualMap[key];
      if (!actualInstance) {
        diff.extra[key] = expected;

        return;
      }
      const renderedForDiff = diffRenderedFor(actualInstance, expected);
      if (!isEmpty(renderedForDiff)) {
        diff.unequal[key] = renderedForDiff;
      }
    }
  );
  forEach(
    actualMap,
    (actual, key) => {
      if (!expectedMap[key]) {
        diff.missing[key] = {
          blueprint: actual,
          props: actual.prevProps,
        };
      }
    }
  );

  return diff;
}
