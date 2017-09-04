declare module 'reactive-renderer/lib/types/BasePropsType' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	export type BasePropsType = {
	    key: string;
	    beforeInit?(instance: BaseBlueprint<any, any, any>, props: BasePropsType): void;
	    afterInit?(instance: BaseBlueprint<any, any, any>, props: BasePropsType): void;
	    beforeChildrenUpdate?(instance: BaseBlueprint<any, any, any>, props: BasePropsType): void;
	    afterChildrenUpdate?(instance: BaseBlueprint<any, any, any>, props: BasePropsType): void;
	    beforeCleanup?(instance: BaseBlueprint<any, any, any>): void;
	    afterCleanup?(instance: BaseBlueprint<any, any, any>): void;
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
	    init(parent: ParentType, props: BasePropsType, context: IContextBase): any;
	}

}
declare module 'reactive-renderer/lib/types/InstanceTree' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { IParentableBy } from 'reactive-renderer/lib/types/IParentableBy';
	import { IContextBase } from 'reactive-renderer/lib/types/IContextBase';
	import { ICommonBlueprintBase } from 'reactive-renderer/lib/types/ICommonBlueprintBase';
	export type InstanceTreeType<ICommonBlueprint extends ICommonBlueprintBase = ICommonBlueprintBase, Blueprint extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> = BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>> = {
	    instance: Blueprint & IParentableBy<Blueprint, ICommonBlueprint> & ICommonBlueprint;
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
	    __children: BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>[];
	    prevProps?: BasePropsType;
	    applyInitialProps(props: PropsType, context: IContext, renderCycleId: number | string): void;
	    abstract updateBeforeChildren(props: PropsType, context: IContext, renderCycleId: number | string): any;
	    abstract updateAfterChildren(props: PropsType, context: IContext, renderCycleId: number | string): any;
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
	export class Renderable<PropsType extends BasePropsType, Blueprint extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContext> & ICommonBlueprint, ParentableBy extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> & ICommonBlueprint, ICommonBlueprint extends ICommonBlueprintBase, IContext extends IContextBase> {
	    blueprint: {
	        new (): Blueprint & IParentableBy<ParentableBy, ICommonBlueprint>;
	    };
	    props: PropsType;
	    children: Renderable<BasePropsType, BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> & IParentableBy<Blueprint, ICommonBlueprint> & ICommonBlueprint, Blueprint, ICommonBlueprint, IContextBase>[];
	    _parentables?: ParentableBy;
	    context: IContext;
	    constructor(args: {
	        blueprint: {
	            new (): Blueprint & IParentableBy<ParentableBy, ICommonBlueprint>;
	        };
	        props: PropsType;
	        children: Renderable<BasePropsType, BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> & IParentableBy<Blueprint, ICommonBlueprint> & ICommonBlueprint, Blueprint, ICommonBlueprint, IContextBase>[];
	        _parentables?: ParentableBy;
	        context: IContext;
	    });
	}

}
declare module 'reactive-renderer/lib/types/Component' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { IParentableBy } from 'reactive-renderer/lib/types/IParentableBy';
	import { ICommonBlueprintBase } from 'reactive-renderer/lib/types/ICommonBlueprintBase';
	import { IContextBase } from 'reactive-renderer/lib/types/IContextBase';
	import { Renderable } from 'reactive-renderer/lib/types/Renderable';
	export type ComponentType<BlueprintClass extends BaseBlueprint<PropsType, ICommonBlueprint, IContextBase> & IParentableBy<ParentableTypes, ICommonBlueprint> & ICommonBlueprint, ParentableTypes extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>, PropsType extends BasePropsType, ICommonBlueprint extends ICommonBlueprintBase, IContext extends IContextBase = IContextBase> = (props: PropsType, children: Renderable<BasePropsType, BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> & IParentableBy<BlueprintClass, ICommonBlueprint> & ICommonBlueprint, BlueprintClass, ICommonBlueprint, IContextBase>[], context?: IContext) => Renderable<PropsType, BlueprintClass & ICommonBlueprint, ParentableTypes & ICommonBlueprint, ICommonBlueprint, IContext>;
	export type ComponentWithContextType<BlueprintClass extends BaseBlueprint<PropsType, ICommonBlueprint, IContextBase> & IParentableBy<ParentableTypes, ICommonBlueprint> & ICommonBlueprint, ParentableTypes extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase>, PropsType extends BasePropsType, ICommonBlueprint extends ICommonBlueprintBase, IContext extends IContextBase = IContextBase> = (props: PropsType, children: Renderable<BasePropsType, BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> & IParentableBy<BlueprintClass, ICommonBlueprint> & ICommonBlueprint, BlueprintClass, ICommonBlueprint, IContextBase>[], context: IContext) => Renderable<PropsType, BlueprintClass & ICommonBlueprint, ParentableTypes & ICommonBlueprint, ICommonBlueprint, IContext>;

}
declare module 'reactive-renderer/lib/types' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { InstanceTreeType } from 'reactive-renderer/lib/types/InstanceTree';
	import { IParentableBy } from 'reactive-renderer/lib/types/IParentableBy';
	import { IContextBase } from 'reactive-renderer/lib/types/IContextBase';
	import { ICommonBlueprintBase } from 'reactive-renderer/lib/types/ICommonBlueprintBase';
	import { Renderable } from 'reactive-renderer/lib/types/Renderable';
	import { ComponentType, ComponentWithContextType } from 'reactive-renderer/lib/types/Component';
	export { BaseBlueprint, BasePropsType, InstanceTreeType, IParentableBy, IContextBase, Renderable, ICommonBlueprintBase, ComponentType, ComponentWithContextType };

}
declare module 'reactive-renderer/lib/createComponent' {
	import { BaseBlueprint, BasePropsType, IParentableBy, ICommonBlueprintBase, IContextBase, ComponentType } from 'reactive-renderer/lib/types';
	/**
	 * creates Component( Props => Renderable ) from a Blueprint Class.
	 * @param blueprintClass - the blueprint class
	 */
	export const defaultContext: IContextBase;
	export function createComponent<BlueprintClass extends BaseBlueprint<PropsType, ICommonBlueprint, IContextBase> & IParentableBy<ParentableTypes, ICommonBlueprint> & ICommonBlueprint, ParentableTypes extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> & ICommonBlueprint, PropsType extends BasePropsType, ICommonBlueprint extends ICommonBlueprintBase>(blueprintClass: {
	    new (): BlueprintClass & IParentableBy<ParentableTypes, ICommonBlueprint>;
	}): ComponentType<BlueprintClass, ParentableTypes, PropsType, ICommonBlueprint>;

}
declare module 'reactive-renderer/lib/createComponentWithContext' {
	import { BaseBlueprint, BasePropsType, IParentableBy, ICommonBlueprintBase, IContextBase, ComponentWithContextType } from 'reactive-renderer/lib/types';
	/**
	 * creates Component( Props => Renderable ) from a Blueprint Class.
	 * @param blueprintClass - the blueprint class
	 */
	export function createComponentWithContext<BlueprintClass extends BaseBlueprint<PropsType, ICommonBlueprint, IContext> & IParentableBy<ParentableTypes, ICommonBlueprint> & ICommonBlueprint, ParentableTypes extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> & ICommonBlueprint, PropsType extends BasePropsType, ICommonBlueprint extends ICommonBlueprintBase, IContext extends IContextBase>(blueprintClass: {
	    new (): BlueprintClass & IParentableBy<ParentableTypes, ICommonBlueprint>;
	}): ComponentWithContextType<BlueprintClass, ParentableTypes, PropsType, ICommonBlueprint, IContext>;

}
declare module 'reactive-renderer/lib/BaseRenderer/deleteTree' {
	import { ICommonBlueprintBase, InstanceTreeType } from 'reactive-renderer/lib/types';
	export function deleteTree<ICommonBlueprint extends ICommonBlueprintBase>(instanceTree: InstanceTreeType<ICommonBlueprint>): void;

}
declare module 'reactive-renderer/lib/BaseRenderer/deleteChild' {
	import { ICommonBlueprintBase, InstanceTreeType } from 'reactive-renderer/lib/types';
	export function deleteChild<ICommonBlueprint extends ICommonBlueprintBase>(instanceTree: InstanceTreeType<ICommonBlueprint>, childKey: string): void;

}
declare module 'reactive-renderer/lib/BaseRenderer/renderChild' {
	import { BaseBlueprint, BasePropsType, Renderable, ICommonBlueprintBase, IContextBase, InstanceTreeType } from 'reactive-renderer/lib/types';
	export function renderChild<ICommonBlueprint extends ICommonBlueprintBase, IContext extends IContextBase>(instanceTree: InstanceTreeType<ICommonBlueprint>, toRender: Renderable<BasePropsType, BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> & ICommonBlueprint, BaseBlueprint<BasePropsType, ICommonBlueprint, IContextBase> & ICommonBlueprint, ICommonBlueprint, IContext>, context: IContext, renderCycleId?: number | string): void;

}
declare module 'reactive-renderer/lib/BaseRenderer' {
	import { BaseBlueprint, BasePropsType, IParentableBy, Renderable, ICommonBlueprintBase, IContextBase } from 'reactive-renderer/lib/types';
	import { deleteTree } from 'reactive-renderer/lib/BaseRenderer/deleteTree';
	import { deleteChild } from 'reactive-renderer/lib/BaseRenderer/deleteChild';
	import { renderChild } from 'reactive-renderer/lib/BaseRenderer/renderChild';
	export type BaseRootRenderableType<_Root extends BaseBlueprint<BasePropsType, ICommonBlueprint, IContext>, ICommonBlueprint extends ICommonBlueprintBase, IContext extends IContextBase> = Renderable<BasePropsType, BaseBlueprint<BasePropsType, ICommonBlueprint, IContext> & IParentableBy<_Root, ICommonBlueprint> & ICommonBlueprint, _Root & ICommonBlueprint, ICommonBlueprint, IContext>;
	export abstract class BaseRenderer<RootType extends BaseBlueprint<RootPropsType, ICommonBlueprint, IContext>, RootPropsType extends BasePropsType, ICommonBlueprint extends ICommonBlueprintBase, IContext extends IContextBase> {
	    abstract render(rootRenderable: BaseRootRenderableType<RootType, ICommonBlueprint, IContext> | null, context: IContext, rootProps?: RootPropsType): any;
	    abstract dispose(): any;
	}
	export default BaseRenderer;
	export { deleteChild, deleteTree, renderChild };

}
declare module 'reactive-renderer' {
	/**
	 * Reactive Renderer
	 */
	import BaseRenderer, { BaseRootRenderableType, renderChild, deleteChild } from 'reactive-renderer/lib/BaseRenderer';
	import { createComponent } from 'reactive-renderer/lib/createComponent';
	import { createComponentWithContext } from 'reactive-renderer/lib/createComponentWithContext';
	import { BaseBlueprint, BasePropsType, InstanceTreeType, IContextBase, IParentableBy, ICommonBlueprintBase, Renderable, ComponentType } from 'reactive-renderer/lib/types';
	export { BaseRenderer, BaseRootRenderableType, renderChild, deleteChild, createComponent, createComponentWithContext, ComponentType, BaseBlueprint, BasePropsType, InstanceTreeType, IContextBase, IParentableBy, ICommonBlueprintBase, Renderable };

}
