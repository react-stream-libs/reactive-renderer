import * as React from 'react';
import * as _ from 'lodash';
import ReactMonacoEditor, {ICodeEditor} from 'react-monaco-editor';

import { addDefaultFiles } from '../monaco/defaultFiles';

export type PropsType = {

};
export type StateType = {
};

declare var window: any;

export default class IndexPage extends React.Component<PropsType, StateType> {
  rotation: number;
  refs: {
    [key: string]: React.ReactInstance;
  }
  constructor(props: PropsType) {
    super(props);
    this.rotation = 0;
  }

  componentDidMount() {

  }
  async editorDidMount(editor: ICodeEditor, monaco_: any) {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      "target": monaco.languages.typescript.ScriptTarget.Latest,
      "module": monaco.languages.typescript.ModuleKind.CommonJS,
      "declaration": true,
      "noImplicitAny": true,
      "noUnusedLocals": true,
      "allowJs": false,
      "jsx": monaco.languages.typescript.JsxEmit.React,
      "experimentalDecorators": true,
    });
    window['editor'] = editor;
    window['monaco2'] = monaco_;
    const uri = monaco.Uri.from(
      _.assign({}, editor.getModel().uri, { path: 'hello.ts' })
    );
    // debugger;
    const model = monaco.editor.createModel('', 'typescript', uri);
    // editor.setModel(null);
    editor.setModel(model);
    addDefaultFiles();
    const tsWorker = await monaco.languages.typescript.getTypeScriptWorker();
    console.error(tsWorker);
    debugger;
  }
  render() {
    return (
      <div>
        <ReactMonacoEditor
          language="typescript"
          width="800" height="600"
          options={{}}
          editorDidMount={this.editorDidMount}
        />
      </div>
    )
  }
}