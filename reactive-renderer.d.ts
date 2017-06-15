declare module 'reactive-renderer/lib/types/BasePropsType' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	export type BasePropsType = {
	    key: string;
	    beforeInit?(instance: BaseBlueprint<any, any, any>, props: BasePropsType): void;
	    afterInit?(instance: BaseBlueprint<any, any, any>, props: BasePropsType): void;
	    beforeChildrenUpdate?(instance: BaseBlueprint<any, any, any>, props: BasePropsType): void;
	    afterChildrenUpdate?(instance: BaseBlueprint<any, any, any>, props: BasePropsType): void;
	};

}
declare module 'reactive-renderer/lib/types/ICommonBlueprintBase' {
	export interface ICommonBlueprintBase {
	    /**
	     * type-hack using a (practically) non-existent member.
	     * validates if a type 'extends' ICommonBlueprintBase or not.
	     * don't set the variable manually.
	     * @type {boolean}
	     * @memberof IContext
	     */
	    __EXTENDS_ICOMMON_BLUEPRINT_BASE: null;
	}

}
declare module 'reactive-renderer/lib/types/IContextBase' {
	export interface IContextBase {
	    __EXTENDS_ICONTEXT_BASE: null;
	}

}
declare module 'reactive-renderer/lib/types/IParentableBy' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { IContextBase } from 'reactive-renderer/lib/types/IContextBase';
	import { ICommonBlueprintBase } from 'reactive-renderer/lib/types/ICommonBlueprintBase';
	export interface IParentableBy<ParentType extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>, ICommonBlueprint extends ICommonBlueprintBase> {
	    init(parent: ParentType, context: IContextBase): any;
	}

}
declare module 'reactive-renderer/lib/types/InstanceTree' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { IParentableBy } from 'reactive-renderer/lib/types/IParentableBy';
	import { IContextBase } from 'reactive-renderer/lib/types/IContextBase';
	import { ICommonBlueprintBase } from 'reactive-renderer/lib/types/ICommonBlueprintBase';
	export type InstanceTreeType<ICommonBlueprint extends ICommonBlueprintBase> = {
	    instance: BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> & IParentableBy<BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>, ICommonBlueprint> & ICommonBlueprint;
	    key: string;
	    context: IContextBase;
	    childrenDict: {
	        [key: string]: InstanceTreeType<ICommonBlueprint>;
	    };
	    childrenList: InstanceTreeType<ICommonBlueprint>[];
	};

}
declare module 'reactive-renderer/lib/types/BaseBlueprint' {
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { ICommonBlueprintBase } from 'reactive-renderer/lib/types/ICommonBlueprintBase';
	import { IContextBase } from 'reactive-renderer/lib/types/IContextBase';
	import { InstanceTreeType } from 'reactive-renderer/lib/types/InstanceTree';
	/**
	 * @export
	 * @abstract
	 * @class BaseBlueprint
	 * @template PropsType
	 * @template CommonBlueprintBase
	 */
	export abstract class BaseBlueprint<PropsType extends BasePropsType, ICommonBlueprint extends ICommonBlueprintBase, IContext extends IContextBase> {
	    applyInitialProps(props: PropsType, context: IContext): void;
	    abstract updateBeforeChildren(props: PropsType, context: IContext): any;
	    abstract updateAfterChildren(props: PropsType, context: IContext): any;
	    abstract reorderChildren(oldChildrenList: InstanceTreeType<ICommonBlueprint>[], oldChildrenDict: {
	        [key: string]: InstanceTreeType<ICommonBlueprint>;
	    }, newChildrenList: InstanceTreeType<ICommonBlueprint>[], newChildrenDict: {
	        [key: string]: InstanceTreeType<ICommonBlueprint>;
	    }): void;
	    abstract cleanUp(): any;
	}

}
declare module 'reactive-renderer/lib/types/Renderable' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { IParentableBy } from 'reactive-renderer/lib/types/IParentableBy';
	import { IContextBase } from 'reactive-renderer/lib/types/IContextBase';
	import { ICommonBlueprintBase } from 'reactive-renderer/lib/types/ICommonBlueprintBase';
	export type RenderableType<PropsType extends BasePropsType, Blueprint extends BaseBlueprint<BasePropsType, CommonBlueprintBase, IContext> & CommonBlueprintBase, ParentableBy extends BaseBlueprint<BasePropsType, CommonBlueprintBase, IContextBase> & CommonBlueprintBase, CommonBlueprintBase extends ICommonBlueprintBase, IContext extends IContextBase> = {
	    blueprint: {
	        new (): Blueprint & IParentableBy<ParentableBy, CommonBlueprintBase>;
	    };
	    props: PropsType;
	    children: RenderableType<BasePropsType, BaseBlueprint<BasePropsType, CommonBlueprintBase, IContextBase> & IParentableBy<Blueprint, CommonBlueprintBase> & CommonBlueprintBase, Blueprint, CommonBlueprintBase, IContextBase>[];
	    _parentables?: ParentableBy;
	    context: IContext;
	};

}
declare module 'reactive-renderer/lib/BaseRenderer' {
	import { RenderableType } from 'reactive-renderer/lib/types/Renderable';
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { IParentableBy } from 'reactive-renderer/lib/types/IParentableBy';
	import { ICommonBlueprintBase } from 'reactive-renderer/lib/types/ICommonBlueprintBase';
	import { IContextBase } from 'reactive-renderer/lib/types/IContextBase';
	import { InstanceTreeType } from 'reactive-renderer/lib/types/InstanceTree';
	export type BaseRootRenderableType<_Root extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContext>, ICommonBlueprint extends ICommonBlueprintBase, IContext extends IContextBase> = RenderableType<BasePropsType, BaseBlueprint<BasePropsType, ICommonBlueprint, IContext> & IParentableBy<_Root, ICommonBlueprint> & ICommonBlueprint, _Root & ICommonBlueprint, ICommonBlueprint, IContext>;
	export abstract class BaseRenderer<RootType extends BaseBlueprint<RootPropsType, ICommonBlueprint, IContext>, RootPropsType extends BasePropsType, ICommonBlueprint extends ICommonBlueprintBase, IContext extends IContextBase> {
	    abstract render(rootRenderable: BaseRootRenderableType<RootType, ICommonBlueprint, IContext> | null, context: IContext, rootProps?: RootPropsType): any;
	    abstract dispose(): any;
	}
	export function renderChild<ICommonBlueprint extends ICommonBlueprintBase, IContext extends IContextBase>(instanceTree: InstanceTreeType<ICommonBlueprint>, toRender: RenderableType<BasePropsType, BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> & ICommonBlueprint, BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> & ICommonBlueprint, ICommonBlueprint, IContext>, context: IContext): void;
	export function deleteTree<ICommonBlueprint extends ICommonBlueprintBase>(instanceTree: InstanceTreeType<ICommonBlueprint>): void;
	export function deleteChild<ICommonBlueprint extends ICommonBlueprintBase>(instanceTree: InstanceTreeType<ICommonBlueprint>, childKey: string): void;
	export default BaseRenderer;

}
declare module 'reactive-renderer/lib/createComponent' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { IParentableBy } from 'reactive-renderer/lib/types/IParentableBy';
	import { RenderableType } from 'reactive-renderer/lib/types/Renderable';
	import { ICommonBlueprintBase } from 'reactive-renderer/lib/types/ICommonBlueprintBase';
	import { IContextBase } from 'reactive-renderer/lib/types/IContextBase';
	/**
	 * creates Component( Props => Renderable ) from a Blueprint Class.
	 * @param blueprintClass - the blueprint class
	 */
	export const defaultContext: IContextBase;
	export type ComponentType<BlueprintClass extends BaseBlueprint<PropsType, ICommonBlueprint, IContextBase> & IParentableBy<ParentableTypes, ICommonBlueprint> & ICommonBlueprint, ParentableTypes extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>, PropsType extends BasePropsType, ICommonBlueprint extends ICommonBlueprintBase> = (props: PropsType, children: RenderableType<BasePropsType, BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> & IParentableBy<BlueprintClass, ICommonBlueprint> & ICommonBlueprint, BlueprintClass, ICommonBlueprint, IContextBase>[]) => RenderableType<PropsType, BlueprintClass & ICommonBlueprint, ParentableTypes & ICommonBlueprint, ICommonBlueprint, IContextBase>;
	export function createComponent<BlueprintClass extends BaseBlueprint<PropsType, ICommonBlueprint, IContextBase> & IParentableBy<ParentableTypes, ICommonBlueprint> & ICommonBlueprint, ParentableTypes extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>, PropsType extends BasePropsType, ICommonBlueprint extends ICommonBlueprintBase>(blueprintClass: {
	    new (): BlueprintClass & IParentableBy<ParentableTypes, ICommonBlueprint>;
	}): ComponentType<BlueprintClass, ParentableTypes, PropsType, ICommonBlueprint>;

}
declare module 'reactive-renderer/lib/createComponentWithContext' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { IParentableBy } from 'reactive-renderer/lib/types/IParentableBy';
	import { RenderableType } from 'reactive-renderer/lib/types/Renderable';
	import { ICommonBlueprintBase } from 'reactive-renderer/lib/types/ICommonBlueprintBase';
	import { IContextBase } from 'reactive-renderer/lib/types/IContextBase';
	/**
	 * creates Component( Props => Renderable ) from a Blueprint Class.
	 * @param blueprintClass - the blueprint class
	 */
	export function createComponentWithContext<BlueprintClass extends BaseBlueprint<PropsType, ICommonBlueprint, IContext> & IParentableBy<ParentableTypes, ICommonBlueprint> & ICommonBlueprint, ParentableTypes extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>, PropsType extends BasePropsType, ICommonBlueprint extends ICommonBlueprintBase, IContext extends IContextBase>(blueprintClass: {
	    new (): BlueprintClass & IParentableBy<ParentableTypes, ICommonBlueprint>;
	}): (props: PropsType, children: RenderableType<BasePropsType, BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> & IParentableBy<BlueprintClass, ICommonBlueprint> & ICommonBlueprint, BlueprintClass, ICommonBlueprint, IContextBase>[], context: IContext) => RenderableType<PropsType, BlueprintClass & ICommonBlueprint, ParentableTypes & ICommonBlueprint, ICommonBlueprint, IContext>;

}
declare module 'reactive-renderer/lib/types' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { InstanceTreeType } from 'reactive-renderer/lib/types/InstanceTree';
	import { IParentableBy } from 'reactive-renderer/lib/types/IParentableBy';
	import { IContextBase } from 'reactive-renderer/lib/types/IContextBase';
	import { ICommonBlueprintBase } from 'reactive-renderer/lib/types/ICommonBlueprintBase';
	import { RenderableType } from 'reactive-renderer/lib/types/Renderable';
	export { BaseBlueprint, BasePropsType, InstanceTreeType, IParentableBy, IContextBase, RenderableType, ICommonBlueprintBase };

}
declare module 'reactive-renderer' {
	/**
	 * Reactive Renderer
	 */
	import BaseRenderer, { BaseRootRenderableType, renderChild, deleteChild } from 'reactive-renderer/lib/BaseRenderer';
	import { createComponent, ComponentType } from 'reactive-renderer/lib/createComponent';
	import { BaseBlueprint, BasePropsType, InstanceTreeType, IContextBase, IParentableBy, ICommonBlueprintBase, RenderableType } from 'reactive-renderer/lib/types';
	export { BaseRenderer, BaseRootRenderableType, renderChild, deleteChild, createComponent, ComponentType, BaseBlueprint, BasePropsType, InstanceTreeType, IContextBase, IParentableBy, ICommonBlueprintBase, RenderableType };

}
