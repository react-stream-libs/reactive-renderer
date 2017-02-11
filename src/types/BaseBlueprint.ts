import { BasePropsType } from './BasePropsType';

export abstract class BaseBlueprint<PropsType extends BasePropsType> {
  applyInitialProps(props: PropsType) { }
  abstract updateBeforeChildren(props: PropsType): any;
  abstract updateAfterChildren(props: PropsType): any;
  abstract cleanUp(): any;
}