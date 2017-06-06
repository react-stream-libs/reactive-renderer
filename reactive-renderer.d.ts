declare module 'reactive-renderer/lib/types/BasePropsType' {
	export type BasePropsType = {
	    key: string;
	};

}
declare module 'reactive-renderer/lib/types/IParentableBy' {
	import { BaseBlueprint } from 'reactive-renderer/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/types/BasePropsType';
	export interface IParentableBy<ParentType extends BaseBlueprint<BasePropsType, CommonBlueprintBase>, CommonBlueprintBase> {
	    init(parent: ParentType): any;
	}

}
declare module 'reactive-renderer/lib/types/InstanceTree' {
	import { BaseBlueprint } from 'reactive-renderer/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/types/BasePropsType';
	import { IParentableBy } from 'reactive-renderer/types/IParentableBy';
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
	import { BasePropsType } from 'reactive-renderer/types/BasePropsType';
	import { InstanceTreeType } from 'reactive-renderer/types/InstanceTree';
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
	import { BaseBlueprint } from 'reactive-renderer/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/types/BasePropsType';
	import { IParentableBy } from 'reactive-renderer/types/IParentableBy';
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
	import { RenderableType } from 'reactive-renderer/types/Renderable';
	import { BaseBlueprint } from 'reactive-renderer/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/types/BasePropsType';
	import { IParentableBy } from 'reactive-renderer/types/IParentableBy';
	import { InstanceTreeType } from 'reactive-renderer/types/InstanceTree';
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
	import { BaseBlueprint } from 'reactive-renderer/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/types/BasePropsType';
	import { IParentableBy } from 'reactive-renderer/types/IParentableBy';
	import { RenderableType } from 'reactive-renderer/types/Renderable';
	/**
	 * creates Component( Props => Renderable ) from a Blueprint Class.
	 * @param blueprintClass - the blueprint class
	 */
	export function createComponent<BlueprintClass extends BaseBlueprint<PropsType, CommonBlueprintBase> & IParentableBy<ParentableTypes, CommonBlueprintBase> & CommonBlueprintBase, ParentableTypes extends BaseBlueprint<BasePropsType, CommonBlueprintBase>, PropsType extends BasePropsType, CommonBlueprintBase>(blueprintClass: {
	    new (): BlueprintClass & IParentableBy<ParentableTypes, CommonBlueprintBase>;
	}): (props: PropsType, children: RenderableType<BasePropsType, BaseBlueprint<BasePropsType, CommonBlueprintBase> & IParentableBy<BlueprintClass, CommonBlueprintBase> & CommonBlueprintBase, BlueprintClass, CommonBlueprintBase>[]) => RenderableType<PropsType, BlueprintClass & CommonBlueprintBase, ParentableTypes & CommonBlueprintBase, CommonBlueprintBase>;

}
declare module 'reactive-renderer/lib/types' {
	import { BaseBlueprint } from 'reactive-renderer/types/BaseBlueprint';
	import { BasePropsType } from 'reactive-renderer/types/BasePropsType';
	import { InstanceTreeType } from 'reactive-renderer/types/InstanceTree';
	import { IParentableBy } from 'reactive-renderer/types/IParentableBy';
	import { RenderableType } from 'reactive-renderer/types/Renderable';
	export { BaseBlueprint, BasePropsType, InstanceTreeType, IParentableBy, RenderableType };

}
declare module 'reactive-renderer' {
	/**
	 * Reactive Renderer
	 */
	import BaseRenderer, { BaseRootRenderableType, renderChild, deleteChild } from 'reactive-renderer/BaseRenderer';
	import { createComponent } from 'reactive-renderer/createComponent';
	import { BaseBlueprint, BasePropsType, InstanceTreeType, IParentableBy, RenderableType } from 'reactive-renderer/types';
	export { BaseRenderer, BaseRootRenderableType, renderChild, deleteChild, createComponent, BaseBlueprint, BasePropsType, InstanceTreeType, IParentableBy, RenderableType };

}
declare module 'reactive-renderer/lib/__unittests__/Logger' {
	import { BaseBlueprint, BasePropsType } from 'reactive-renderer/';
	export default class Logger<CommonBlueprintBase> {
	    logs: LogItem<CommonBlueprintBase>[];
	    constructor(logs?: LogItem<CommonBlueprintBase>[]);
	    add(logItem: LogItem<CommonBlueprintBase>): void;
	    partialMatch(partialLogItems: LogItem<CommonBlueprintBase>[]): void;
	}
	export type LogItemEventType = 'init' | 'update' | 'delete' | 'reorder';
	export type LogItemDataType<CommonBlueprintBase> = {
	    [key: string]: BaseBlueprint<BasePropsType, CommonBlueprintBase> | typeof BaseBlueprint | string | BasePropsType;
	    instance?: BaseBlueprint<BasePropsType, CommonBlueprintBase>;
	    parentInstance?: BaseBlueprint<BasePropsType, CommonBlueprintBase>;
	    blueprint?: typeof BaseBlueprint;
	    key?: string;
	    type: LogItemEventType;
	    props?: BasePropsType;
	};
	export class LogItem<CommonBlueprintBase> {
	    private data;
	    constructor(args: LogItemDataType<CommonBlueprintBase>);
	    partialMatch(toMatch: LogItem<CommonBlueprintBase>): void;
	}

}
declare module 'reactive-renderer/lib/__unittests__/Logger/logger.test' {
	export interface ICommonBlueprintBase {
	}

}
declare module 'reactive-renderer/lib/__unittests__/Renderer/CommonBlueprintBase' {
	export interface ICommonBlueprintBase {
	    someCommonMethod(): string;
	}

}
declare module 'reactive-renderer/lib/__unittests__/Renderer/Components/types' {
	/**
	 * example of hiding CommonBlueprintBase from type definitions.
	 * re-defines somewhat-bloated types due to CommonBlueprintBase.
	 */
	import { BaseBlueprint, BasePropsType, IParentableBy as _IParentableBy, RenderableType as _RenderableType, InstanceTreeType as _InstanceTreeType } from 'reactive-renderer';
	import { default as _Logger, LogItem as _LogItem } from 'reactive-renderer/__unittests__/Logger';
	import { ICommonBlueprintBase } from 'reactive-renderer/__unittests__/Renderer/CommonBlueprintBase';
	export abstract class Blueprint<PropsType extends BasePropsType> extends BaseBlueprint<PropsType, ICommonBlueprintBase> implements ICommonBlueprintBase {
	    someCommonMethod: () => string;
	}
	export interface IParentableBy<_Blueprint extends Blueprint<any>> extends _IParentableBy<_Blueprint, ICommonBlueprintBase> {
	}
	export type RenderableType<PropsType extends BasePropsType, _Blueprint extends Blueprint<BasePropsType>, ParentableBy extends Blueprint<BasePropsType>> = _RenderableType<PropsType, _Blueprint, ParentableBy, ICommonBlueprintBase>;
	export class Logger extends _Logger<ICommonBlueprintBase> {
	}
	export class LogItem extends _LogItem<ICommonBlueprintBase> {
	}
	export function createComponent<BlueprintClass extends Blueprint<PropsType> & IParentableBy<ParentableTypes>, ParentableTypes extends Blueprint<BasePropsType>, PropsType extends BasePropsType>(blueprintClass: {
	    new (): BlueprintClass & IParentableBy<ParentableTypes>;
	}): (props: BasePropsType, children: _RenderableType<BasePropsType, BaseBlueprint<BasePropsType, {}> & _IParentableBy<BlueprintClass & IParentableBy<ParentableTypes>, {}>, BlueprintClass & IParentableBy<ParentableTypes>, {}>[]) => _RenderableType<BasePropsType, BlueprintClass & IParentableBy<ParentableTypes>, ParentableTypes & {}, {}>;
	export type InstanceTreeType = _InstanceTreeType<ICommonBlueprintBase>;
	export { BasePropsType, _RenderableType, _IParentableBy, BaseBlueprint };

}
declare module 'reactive-renderer/lib/__unittests__/Renderer/Components/fakeRoot' {
	import Logger from 'reactive-renderer/__unittests__/Logger';
	import { Blueprint, IParentableBy, BasePropsType, _RenderableType, _IParentableBy, BaseBlueprint, InstanceTreeType } from 'reactive-renderer/__unittests__/Renderer/Components/types';
	import { ICommonBlueprintBase } from 'reactive-renderer/__unittests__/Renderer/CommonBlueprintBase';
	export class NoneExistentBlueprint extends Blueprint<BasePropsType> {
	    init(parent: Blueprint<BasePropsType>): void;
	    reorderChildren(oldChildrenList: InstanceTreeType[], oldChildrenDict: {
	        [key: string]: InstanceTreeType;
	    }, newChildrenList: InstanceTreeType[], newChildrenDict: {
	        [key: string]: InstanceTreeType;
	    }): void;
	    updateBeforeChildren(props: BasePropsType): void;
	    updateAfterChildren(props: BasePropsType): void;
	    cleanUp(): void;
	}
	export type FakeRootPropsType = {} & BasePropsType;
	export class _FakeRoot extends Blueprint<FakeRootPropsType> implements IParentableBy<NoneExistentBlueprint> {
	    someCommonMethod: () => 'hello';
	    private logger;
	    constructor(logger?: Logger<ICommonBlueprintBase>);
	    init(parent: NoneExistentBlueprint): void;
	    updateBeforeChildren(props: BasePropsType): void;
	    updateAfterChildren(props: BasePropsType): void;
	    reorderChildren(oldChildrenList: InstanceTreeType[], oldChildrenDict: {
	        [key: string]: InstanceTreeType;
	    }, newChildrenList: InstanceTreeType[], newChildrenDict: {
	        [key: string]: InstanceTreeType;
	    }): void;
	    cleanUp(): void;
	} const fakeRoot: (props: BasePropsType, children: _RenderableType<BasePropsType, BaseBlueprint<BasePropsType, {}> & _IParentableBy<_FakeRoot & IParentableBy<NoneExistentBlueprint>, {}>, _FakeRoot & IParentableBy<NoneExistentBlueprint>, {}>[]) => _RenderableType<BasePropsType, _FakeRoot & IParentableBy<NoneExistentBlueprint>, NoneExistentBlueprint, {}>;
	export default fakeRoot;
	export { _RenderableType as RenderableType, _IParentableBy as IParentableBy, BaseBlueprint };

}
declare module 'reactive-renderer/lib/__unittests__/Renderer/FakeRenderer' {
	import BaseRenderer, { BaseRootRenderableType } from 'reactive-renderer/BaseRenderer';
	import { InstanceTreeType, Logger } from 'reactive-renderer/__unittests__/Renderer/Components/types';
	import { _FakeRoot, FakeRootPropsType } from 'reactive-renderer/__unittests__/Renderer/Components/fakeRoot';
	import { ICommonBlueprintBase } from 'reactive-renderer/__unittests__/Renderer/CommonBlueprintBase';
	export default class FakeRenderer extends BaseRenderer<_FakeRoot, FakeRootPropsType, ICommonBlueprintBase> {
	    logger: Logger;
	    instanceTree: InstanceTreeType;
	    constructor(logger: Logger);
	    render(toRender: BaseRootRenderableType<_FakeRoot, ICommonBlueprintBase> | null, rootProps?: FakeRootPropsType): void;
	    dispose(): void;
	}

}
declare module 'reactive-renderer/lib/__unittests__/Renderer/Components/Grandparent' {
	import { BasePropsType } from 'reactive-renderer';
	import { _FakeRoot } from 'reactive-renderer/__unittests__/Renderer/Components/fakeRoot';
	import { Blueprint, IParentableBy, RenderableType, Logger, InstanceTreeType } from 'reactive-renderer/__unittests__/Renderer/Components/types';
	export type _GrandparentParentTypes = _FakeRoot;
	export type GrandParentPropsType = {} & BasePropsType;
	export class __GrandParent extends Blueprint<GrandParentPropsType> implements IParentableBy<_GrandparentParentTypes> {
	    someCommonMethod: () => '__GrandParent';
	    protected parent: _GrandparentParentTypes;
	    protected logger: Logger;
	    init(parent: _GrandparentParentTypes): void;
	    updateBeforeChildren(props: GrandParentPropsType): void;
	    updateAfterChildren(props: GrandParentPropsType): void;
	    reorderChildren(oldChildrenList: InstanceTreeType[], oldChildrenDict: {
	        [key: string]: InstanceTreeType;
	    }, newChildrenList: InstanceTreeType[], newChildrenDict: {
	        [key: string]: InstanceTreeType;
	    }): void;
	    cleanUp(): void;
	}
	export function getGrandparentComps(logger: Logger): {
	    _GrandParent: typeof __GrandParent;
	    GrandParent(props: GrandParentPropsType, children: RenderableType<BasePropsType, Blueprint<BasePropsType> & IParentableBy<__GrandParent>, __GrandParent>[]): RenderableType<GrandParentPropsType, __GrandParent, _GrandparentParentTypes>;
	};
	export { RenderableType };

}
declare module 'reactive-renderer/lib/__unittests__/Renderer/Components/Layer' {
	import { BasePropsType } from 'reactive-renderer';
	import { __GrandParent } from 'reactive-renderer/__unittests__/Renderer/Components/Grandparent';
	import Logger from 'reactive-renderer/__unittests__/Logger';
	import { ICommonBlueprintBase } from 'reactive-renderer/__unittests__/Renderer/CommonBlueprintBase';
	import { Blueprint, IParentableBy, RenderableType, InstanceTreeType } from 'reactive-renderer/__unittests__/Renderer/Components/types';
	export type _LayerParentTypes = __GrandParent & __Layer;
	export type LayerPropsType = {} & BasePropsType;
	export class __Layer extends Blueprint<LayerPropsType> implements IParentableBy<_LayerParentTypes> {
	    someCommonMethod: () => '__Layer';
	    parent: _LayerParentTypes;
	    protected logger: Logger<ICommonBlueprintBase>;
	    init(parent: _LayerParentTypes): void;
	    updateBeforeChildren(props: LayerPropsType): void;
	    updateAfterChildren(props: LayerPropsType): void;
	    reorderChildren(oldChildrenList: InstanceTreeType[], oldChildrenDict: {
	        [key: string]: InstanceTreeType;
	    }, newChildrenList: InstanceTreeType[], newChildrenDict: {
	        [key: string]: InstanceTreeType;
	    }): void;
	    cleanUp(): void;
	}
	export function getLayerComps(logger: Logger<ICommonBlueprintBase>): {
	    _Layer: typeof __Layer;
	    Layer(props: LayerPropsType, children: RenderableType<BasePropsType, Blueprint<BasePropsType> & IParentableBy<__Layer>, __Layer>[]): RenderableType<LayerPropsType, __Layer, _LayerParentTypes>;
	};
	export { RenderableType };

}
declare module 'reactive-renderer/lib/__unittests__/Renderer/Components/Child' {
	import { BasePropsType } from 'reactive-renderer/types/BasePropsType';
	import { ICommonBlueprintBase } from 'reactive-renderer/__unittests__/Renderer/CommonBlueprintBase';
	import { __Layer } from 'reactive-renderer/__unittests__/Renderer/Components/Layer';
	import { Blueprint, IParentableBy, Logger, RenderableType, InstanceTreeType } from 'reactive-renderer/__unittests__/Renderer/Components/types';
	export type _ChildParentTypes = __Layer;
	export type ChildPropsType = {} & BasePropsType;
	export class __Child extends Blueprint<ChildPropsType> implements IParentableBy<_ChildParentTypes> {
	    someCommonMethod: () => '__Child';
	    parent: _ChildParentTypes;
	    protected logger: Logger;
	    init(parent: _ChildParentTypes): void;
	    updateBeforeChildren(props: ChildPropsType): void;
	    updateAfterChildren(props: ChildPropsType): void;
	    reorderChildren(oldChildrenList: InstanceTreeType[], oldChildrenDict: {
	        [key: string]: InstanceTreeType;
	    }, newChildrenList: InstanceTreeType[], newChildrenDict: {
	        [key: string]: InstanceTreeType;
	    }): void;
	    cleanUp(): void;
	}
	export function getChildComps(logger: Logger): {
	    _Child: typeof __Child;
	    Child(props: ChildPropsType, children: RenderableType<BasePropsType, Blueprint<BasePropsType> & IParentableBy<__Child> & ICommonBlueprintBase, __Child>[]): RenderableType<ChildPropsType, __Child, _ChildParentTypes>;
	};
	export { RenderableType };

}
