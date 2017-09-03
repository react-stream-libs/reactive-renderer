import { BaseBlueprint } from './BaseBlueprint';

export type BasePropsType = {
  key: string;
  beforeInit?(instance: BaseBlueprint<any, any, any>, props: BasePropsType): void;
  afterInit?(instance: BaseBlueprint<any, any, any>, props: BasePropsType): void;
  beforeChildrenUpdate?(instance: BaseBlueprint<any, any, any>, props: BasePropsType): void;
  afterChildrenUpdate?(instance: BaseBlueprint<any, any, any>, props: BasePropsType): void;
  beforeCleanup?(instance: BaseBlueprint<any, any, any>): void;
  afterCleanup?(instance: BaseBlueprint<any, any, any>): void;
};
