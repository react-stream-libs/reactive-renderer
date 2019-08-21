import {
  isEqual,
  every,
} from 'lodash';
import {
  IContextBase,
} from '../../..';
import {
  BasePropsType,
  RenderableType,
  Blueprint,
} from '../Components/types';

export type RenderedForDiffResultType = {
  blueprintDiff?: {
    got: Blueprint<BasePropsType, IContextBase>,
    expected: new() => Blueprint,
  },
  propsDiff?: {
    got?: BasePropsType, expected: BasePropsType,
  },
};
export type RenderedForDiffOptions = {
  allowPartialProps?: boolean,
};

export function diffRenderedFor(
  actual: Blueprint,
  expected: RenderableType<
    BasePropsType,
    Blueprint,
    Blueprint
  >,
  options: RenderedForDiffOptions = {}
): RenderedForDiffResultType {
  const diff: RenderedForDiffResultType = {};
  if (!(actual instanceof expected.blueprint)) {
    diff.blueprintDiff = {
      got: actual,
      expected: expected.blueprint
    };
  }
  const actualPrevProps: any = actual.prevProps;
  const propsUnequal: boolean | undefined = (
    !options.allowPartialProps
      && !isEqual(actual.prevProps, expected.props)
  ) || (
    options.allowPartialProps
      && every(
        expected.props,
        (expectedProp, key) => isEqual(actualPrevProps[key], expectedProp)
      )
  );
  if (propsUnequal) {
    diff.propsDiff = {
      got: actual.prevProps,
      expected: expected.props,
    };
  }

  return diff;
}
