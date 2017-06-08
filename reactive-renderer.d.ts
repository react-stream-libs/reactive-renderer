declare module 'reactive-renderer/lib/types/BasePropsType' {
	export type BasePropsType = {
	    key: string;
	};

}
declare module 'reactive-renderer/lib/types/IParentableBy' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	export interface IParentableBy<ParentType extends BaseBlueprint<BasePropsType, CommonBlueprintBase>, CommonBlueprintBase> {
	    init(parent: ParentType): any;
	}

}
declare module 'reactive-renderer/lib/types/InstanceTree' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { IParentableBy } from 'reactive-renderer/lib/types/IParentableBy';
	export type InstanceTreeType<ICommonBlueprintBase> = {
	    instance: BaseBlueprint<BasePropsType, ICommonBlueprintBase> & IParentableBy<BaseBlueprint<BasePropsType, ICommonBlueprintBase>, ICommonBlueprintBase> & ICommonBlueprintBase;
	    key: string;
	    childrenDict: {
	        [key: string]: InstanceTreeType<ICommonBlueprintBase>;
	    };
	    childrenList: InstanceTreeType<ICommonBlueprintBase>[];
	};

}
declare module 'reactive-renderer/lib/types/BaseBlueprint' {
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { InstanceTreeType } from 'reactive-renderer/lib/types/InstanceTree';
	/**
	 * @export
	 * @abstract
	 * @class BaseBlueprint
	 * @template PropsType
	 * @template CommonBlueprintBase
	 */
	export abstract class BaseBlueprint<PropsType extends BasePropsType, CommonBlueprintBase> {
	    applyInitialProps(props: PropsType): void;
	    abstract updateBeforeChildren(props: PropsType): any;
	    abstract updateAfterChildren(props: PropsType): any;
	    abstract reorderChildren(oldChildrenList: InstanceTreeType<CommonBlueprintBase>[], oldChildrenDict: {
	        [key: string]: InstanceTreeType<CommonBlueprintBase>;
	    }, newChildrenList: InstanceTreeType<CommonBlueprintBase>[], newChildrenDict: {
	        [key: string]: InstanceTreeType<CommonBlueprintBase>;
	    }): void;
	    abstract cleanUp(): any;
	}

}
declare module 'reactive-renderer/lib/types/Renderable' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { IParentableBy } from 'reactive-renderer/lib/types/IParentableBy';
	export type RenderableType<PropsType extends BasePropsType, Blueprint extends BaseBlueprint<BasePropsType, CommonBlueprintBase> & CommonBlueprintBase, ParentableBy extends BaseBlueprint<BasePropsType, CommonBlueprintBase> & CommonBlueprintBase, CommonBlueprintBase> = {
	    blueprint: {
	        new (): Blueprint & IParentableBy<ParentableBy, CommonBlueprintBase>;
	    };
	    props: PropsType;
	    children: RenderableType<BasePropsType, BaseBlueprint<BasePropsType, CommonBlueprintBase> & IParentableBy<Blueprint, CommonBlueprintBase> & CommonBlueprintBase, Blueprint, CommonBlueprintBase>[];
	    _parentables?: ParentableBy;
	};

}
declare module 'reactive-renderer/lib/BaseRenderer' {
	import { RenderableType } from 'reactive-renderer/lib/types/Renderable';
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { IParentableBy } from 'reactive-renderer/lib/types/IParentableBy';
	import { InstanceTreeType } from 'reactive-renderer/lib/types/InstanceTree';
	export type BaseRootRenderableType<_Root extends BaseBlueprint<BasePropsType, CommonBlueprintBase>, CommonBlueprintBase> = RenderableType<BasePropsType, BaseBlueprint<BasePropsType, CommonBlueprintBase> & IParentableBy<_Root, CommonBlueprintBase> & CommonBlueprintBase, _Root & CommonBlueprintBase, CommonBlueprintBase>;
	export abstract class BaseRenderer<RootType extends BaseBlueprint<RootPropsType, CommonBlueprintBase>, RootPropsType extends BasePropsType, CommonBlueprintBase> {
	    abstract render(rootRenderable: BaseRootRenderableType<RootType, CommonBlueprintBase> | null, rootProps?: RootPropsType): any;
	    abstract dispose(): any;
	}
	export function renderChild<ICommonBlueprintBase>(instanceTree: InstanceTreeType<ICommonBlueprintBase>, toRender: RenderableType<BasePropsType, BaseBlueprint<BasePropsType, ICommonBlueprintBase> & ICommonBlueprintBase, BaseBlueprint<BasePropsType, ICommonBlueprintBase> & ICommonBlueprintBase, ICommonBlueprintBase>): void;
	export function deleteTree<CommonBlueprintBase>(instanceTree: InstanceTreeType<CommonBlueprintBase>): void;
	export function deleteChild<CommonBlueprintBase>(instanceTree: InstanceTreeType<CommonBlueprintBase>, childKey: string): void;
	export default BaseRenderer;

}
declare module 'reactive-renderer/lib/createComponent' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { IParentableBy } from 'reactive-renderer/lib/types/IParentableBy';
	import { RenderableType } from 'reactive-renderer/lib/types/Renderable';
	/**
	 * creates Component( Props => Renderable ) from a Blueprint Class.
	 * @param blueprintClass - the blueprint class
	 */
	export function createComponent<BlueprintClass extends BaseBlueprint<PropsType, CommonBlueprintBase> & IParentableBy<ParentableTypes, CommonBlueprintBase> & CommonBlueprintBase, ParentableTypes extends BaseBlueprint<BasePropsType, CommonBlueprintBase>, PropsType extends BasePropsType, CommonBlueprintBase>(blueprintClass: {
	    new (): BlueprintClass & IParentableBy<ParentableTypes, CommonBlueprintBase>;
	}): (props: PropsType, children: RenderableType<BasePropsType, BaseBlueprint<BasePropsType, CommonBlueprintBase> & IParentableBy<BlueprintClass, CommonBlueprintBase> & CommonBlueprintBase, BlueprintClass, CommonBlueprintBase>[]) => RenderableType<PropsType, BlueprintClass & CommonBlueprintBase, ParentableTypes & CommonBlueprintBase, CommonBlueprintBase>;

}
declare module 'reactive-renderer/lib/types' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { InstanceTreeType } from 'reactive-renderer/lib/types/InstanceTree';
	import { IParentableBy } from 'reactive-renderer/lib/types/IParentableBy';
	import { RenderableType } from 'reactive-renderer/lib/types/Renderable';
	export { BaseBlueprint, BasePropsType, InstanceTreeType, IParentableBy, RenderableType };

}
declare module 'reactive-renderer' {
	/**
	 * Reactive Renderer
	 */
	import BaseRenderer, { BaseRootRenderableType, renderChild, deleteChild } from 'reactive-renderer/lib/BaseRenderer';
	import { createComponent } from 'reactive-renderer/lib/createComponent';
	import { BaseBlueprint, BasePropsType, InstanceTreeType, IParentableBy, RenderableType } from 'reactive-renderer/lib/types';
	export { BaseRenderer, BaseRootRenderableType, renderChild, deleteChild, createComponent, BaseBlueprint, BasePropsType, InstanceTreeType, IParentableBy, RenderableType };

}
