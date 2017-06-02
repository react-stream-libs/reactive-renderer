declare module 'reactive-renderer/lib/types/BasePropsType' {
	export type BasePropsType = {
	    key: string;
	};

}
declare module 'reactive-renderer/lib/types/BaseBlueprint' {
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	export abstract class BaseBlueprint<PropsType extends BasePropsType> {
	    applyInitialProps(props: PropsType): void;
	    abstract updateBeforeChildren(props: PropsType): any;
	    abstract updateAfterChildren(props: PropsType): any;
	    abstract cleanUp(): any;
	}

}
declare module 'reactive-renderer/lib/types/IParentableBy' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	export interface IParentableBy<ParentType extends BaseBlueprint<BasePropsType>> {
	    init(parent: ParentType): any;
	}

}
declare module 'reactive-renderer/lib/types/Renderable' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { IParentableBy } from 'reactive-renderer/lib/types/IParentableBy';
	export type RenderableType<PropsType extends BasePropsType, Blueprint extends BaseBlueprint<BasePropsType> & CommonBlueprintBase, ParentableBy extends BaseBlueprint<BasePropsType> & CommonBlueprintBase, CommonBlueprintBase> = {
	    blueprint: {
	        new (): Blueprint & IParentableBy<ParentableBy>;
	    };
	    props: PropsType;
	    children: Array<RenderableType<BasePropsType, BaseBlueprint<BasePropsType> & IParentableBy<Blueprint> & CommonBlueprintBase, Blueprint, CommonBlueprintBase>>;
	    _parentables?: ParentableBy;
	};

}
declare module 'reactive-renderer/lib/types/InstanceTree' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { IParentableBy } from 'reactive-renderer/lib/types/IParentableBy';
	export type InstanceTreeType<CommonBlueprintBase> = {
	    instance: BaseBlueprint<BasePropsType> & IParentableBy<BaseBlueprint<BasePropsType>> & CommonBlueprintBase;
	    key: string;
	    childrenDict: {
	        [key: string]: InstanceTreeType<CommonBlueprintBase>;
	    };
	    childrenList: Array<InstanceTreeType<CommonBlueprintBase>>;
	};

}
declare module 'reactive-renderer/lib/BaseRenderer' {
	import { RenderableType } from 'reactive-renderer/lib/types/Renderable';
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { IParentableBy } from 'reactive-renderer/lib/types/IParentableBy';
	import { InstanceTreeType } from 'reactive-renderer/lib/types/InstanceTree';
	export type BaseRootRenderableType<_Root extends BaseBlueprint<BasePropsType>, CommonBlueprintBase> = RenderableType<BasePropsType, BaseBlueprint<BasePropsType> & IParentableBy<_Root> & CommonBlueprintBase, _Root & CommonBlueprintBase, CommonBlueprintBase>;
	export abstract class BaseReactiveRenderer<RootType extends BaseBlueprint<RootPropsType>, RootPropsType extends BasePropsType, CommonBlueprintBase> {
	    abstract render(rootRenderable: BaseRootRenderableType<RootType, CommonBlueprintBase> | null, rootProps?: RootPropsType): any;
	    abstract dispose(): any;
	}
	export function renderChild<CommonBlueprintBase>(instanceTree: InstanceTreeType<CommonBlueprintBase>, toRender: RenderableType<BasePropsType, BaseBlueprint<BasePropsType> & CommonBlueprintBase, BaseBlueprint<BasePropsType> & CommonBlueprintBase, CommonBlueprintBase>): void;
	export function deleteChild<CommonBlueprintBase>(instanceTree: InstanceTreeType<CommonBlueprintBase>, childKey: string): void;
	export default BaseReactiveRenderer;

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
	export function createComponent<BlueprintClass extends BaseBlueprint<PropsType> & IParentableBy<ParentableTypes> & CommonBlueprintBase, ParentableTypes extends BaseBlueprint<BasePropsType>, PropsType extends BasePropsType, CommonBlueprintBase>(blueprintClass: {
	    new (): BlueprintClass & IParentableBy<ParentableTypes>;
	}): (props: PropsType, children: RenderableType<BasePropsType, BaseBlueprint<BasePropsType> & IParentableBy<BlueprintClass> & CommonBlueprintBase, BlueprintClass, CommonBlueprintBase>[]) => RenderableType<PropsType, BlueprintClass & CommonBlueprintBase, ParentableTypes & CommonBlueprintBase, CommonBlueprintBase>;

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
declare module 'reactive-renderer/lib/__unittests__/Logger' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	export default class Logger {
	    logs: Array<LogItem>;
	    constructor(logs?: Array<LogItem>);
	    add(logItem: LogItem): void;
	    partialMatch(partialLogItems: Array<LogItem>): void;
	}
	export type LogItemEventType = 'init' | 'update' | 'delete';
	export type LogItemDataType = {
	    [key: string]: BaseBlueprint<BasePropsType> | typeof BaseBlueprint | string | BasePropsType;
	    instance?: BaseBlueprint<BasePropsType>;
	    parentInstance?: BaseBlueprint<BasePropsType>;
	    blueprint?: typeof BaseBlueprint;
	    key?: string;
	    type: LogItemEventType;
	    props?: BasePropsType;
	};
	export class LogItem {
	    data: LogItemDataType;
	    constructor(args: LogItemDataType);
	    partialMatch(toMatch: LogItem): void;
	}

}
declare module 'reactive-renderer/lib/__unittests__/Renderer/CommonBlueprintBase' {
	export interface CommonBlueprintBase {
	    someCommonMethod: () => string;
	}

}
declare module 'reactive-renderer/lib/__unittests__/Renderer/Components/FakeRoot' {
	import Logger from 'reactive-renderer/lib/__unittests__/Logger';
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { IParentableBy } from 'reactive-renderer/lib/types/IParentableBy';
	import { CommonBlueprintBase } from 'reactive-renderer/lib/__unittests__/Renderer/CommonBlueprintBase';
	export class NoneExistentBlueprint extends BaseBlueprint<BasePropsType> {
	    init(parent: BaseBlueprint<BasePropsType>): void;
	    updateBeforeChildren(props: BasePropsType): void;
	    updateAfterChildren(props: BasePropsType): void;
	    cleanUp(): void;
	}
	export type FakeRootPropsType = {} & BasePropsType;
	export class _FakeRoot extends BaseBlueprint<FakeRootPropsType> implements IParentableBy<NoneExistentBlueprint>, CommonBlueprintBase {
	    someCommonMethod: () => "hello";
	    logger: Logger;
	    constructor(logger?: Logger);
	    init(parent: NoneExistentBlueprint): void;
	    updateBeforeChildren(props: BasePropsType): void;
	    updateAfterChildren(props: BasePropsType): void;
	    cleanUp(): void;
	}
	/**
	 * INTERNAL USE: Fake Root
	 * @param props: FakeRoot props
	 */
	export const FakeRoot: (props: BasePropsType, children: RenderableType<BasePropsType, BaseBlueprint<BasePropsType> & IParentableBy<_FakeRoot> & CommonBlueprintBase, _FakeRoot, CommonBlueprintBase>[]) => RenderableType<BasePropsType, _FakeRoot & CommonBlueprintBase, NoneExistentBlueprint & CommonBlueprintBase, CommonBlueprintBase>;
	export default FakeRoot;
	import { RenderableType } from 'reactive-renderer/lib/types/Renderable';
	export { RenderableType };

}
declare module 'reactive-renderer/lib/__unittests__/Renderer/FakeRenderer' {
	import Logger from 'reactive-renderer/lib/__unittests__/Logger';
	import BaseRenderer, { BaseRootRenderableType } from 'reactive-renderer/lib/BaseRenderer';
	import { InstanceTreeType } from 'reactive-renderer/lib/types/InstanceTree';
	import { _FakeRoot, FakeRootPropsType } from 'reactive-renderer/lib/__unittests__/Renderer/Components/FakeRoot';
	import { CommonBlueprintBase } from 'reactive-renderer/lib/__unittests__/Renderer/CommonBlueprintBase';
	export default class FakeRenderer extends BaseRenderer<_FakeRoot, FakeRootPropsType, CommonBlueprintBase> {
	    logger: Logger;
	    instanceTree: InstanceTreeType<CommonBlueprintBase>;
	    constructor(logger: Logger);
	    render(toRender: BaseRootRenderableType<_FakeRoot, CommonBlueprintBase> | null, rootProps?: FakeRootPropsType): void;
	    dispose(): void;
	}

}
declare module 'reactive-renderer/lib/__unittests__/Renderer/Components/Grandparent' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { IParentableBy } from 'reactive-renderer/lib/types/IParentableBy';
	import { RenderableType } from 'reactive-renderer/lib/types/Renderable';
	import { CommonBlueprintBase } from 'reactive-renderer/lib/__unittests__/Renderer/CommonBlueprintBase';
	import { _FakeRoot } from 'reactive-renderer/lib/__unittests__/Renderer/Components/FakeRoot';
	import Logger from 'reactive-renderer/lib/__unittests__/Logger';
	export type _GrandparentParentTypes = _FakeRoot;
	export type GrandParentPropsType = {} & BasePropsType;
	export class __GrandParent extends BaseBlueprint<GrandParentPropsType> implements IParentableBy<_GrandparentParentTypes>, CommonBlueprintBase {
	    someCommonMethod: () => '__GrandParent';
	    parent: _GrandparentParentTypes;
	    logger: Logger;
	    init(parent: _GrandparentParentTypes): void;
	    updateBeforeChildren(props: GrandParentPropsType): void;
	    updateAfterChildren(props: GrandParentPropsType): void;
	    cleanUp(): void;
	}
	export function getGrandparentComps(logger: Logger): {
	    _GrandParent: typeof __GrandParent;
	    GrandParent: (props: GrandParentPropsType, children: Array<RenderableType<BasePropsType, BaseBlueprint<BasePropsType> & IParentableBy<__GrandParent> & CommonBlueprintBase, __GrandParent, CommonBlueprintBase>>) => RenderableType<GrandParentPropsType, __GrandParent, _GrandparentParentTypes, CommonBlueprintBase>;
	};
	export { RenderableType };

}
declare module 'reactive-renderer/lib/__unittests__/Renderer/Components/Layer' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { IParentableBy } from 'reactive-renderer/lib/types/IParentableBy';
	import { RenderableType } from 'reactive-renderer/lib/types/Renderable';
	import { __GrandParent } from 'reactive-renderer/lib/__unittests__/Renderer/Components/Grandparent';
	import Logger from 'reactive-renderer/lib/__unittests__/Logger';
	import { CommonBlueprintBase } from 'reactive-renderer/lib/__unittests__/Renderer/CommonBlueprintBase';
	export type _LayerParentTypes = __GrandParent & __Layer;
	export type LayerPropsType = {} & BasePropsType;
	export class __Layer extends BaseBlueprint<LayerPropsType> implements IParentableBy<_LayerParentTypes>, CommonBlueprintBase {
	    someCommonMethod: () => "__Layer";
	    parent: _LayerParentTypes;
	    logger: Logger;
	    init(parent: _LayerParentTypes): void;
	    updateBeforeChildren(props: LayerPropsType): void;
	    updateAfterChildren(props: LayerPropsType): void;
	    cleanUp(): void;
	}
	export function getLayerComps(logger: Logger): {
	    _Layer: typeof __Layer;
	    Layer: (props: LayerPropsType, children: Array<RenderableType<BasePropsType, BaseBlueprint<BasePropsType> & IParentableBy<__Layer> & CommonBlueprintBase, __Layer, CommonBlueprintBase>>) => RenderableType<LayerPropsType, __Layer, _LayerParentTypes, CommonBlueprintBase>;
	};
	export { RenderableType };

}
declare module 'reactive-renderer/lib/__unittests__/Renderer/Components/Child' {
	import { BaseBlueprint } from 'reactive-renderer/lib/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/lib/types/BasePropsType';
	import { IParentableBy } from 'reactive-renderer/lib/types/IParentableBy';
	import { RenderableType } from 'reactive-renderer/lib/types/Renderable';
	import { CommonBlueprintBase } from 'reactive-renderer/lib/__unittests__/Renderer/CommonBlueprintBase';
	import { __Layer } from 'reactive-renderer/lib/__unittests__/Renderer/Components/Layer';
	import Logger from 'reactive-renderer/lib/__unittests__/Logger';
	export type _ChildParentTypes = __Layer;
	export type ChildPropsType = {} & BasePropsType;
	export class __Child extends BaseBlueprint<ChildPropsType> implements IParentableBy<_ChildParentTypes>, CommonBlueprintBase {
	    someCommonMethod: () => '__Child';
	    parent: _ChildParentTypes;
	    logger: Logger;
	    init(parent: _ChildParentTypes): void;
	    updateBeforeChildren(props: ChildPropsType): void;
	    updateAfterChildren(props: ChildPropsType): void;
	    cleanUp(): void;
	}
	export function getChildComps(logger: Logger): {
	    _Child: typeof __Child;
	    Child: (props: ChildPropsType, children: Array<RenderableType<BasePropsType, BaseBlueprint<BasePropsType> & IParentableBy<__Child> & CommonBlueprintBase, __Child, CommonBlueprintBase>>) => RenderableType<ChildPropsType, __Child, _ChildParentTypes, CommonBlueprintBase>;
	};
	export { RenderableType };

}
