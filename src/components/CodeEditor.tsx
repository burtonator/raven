import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  readonly language: string
  readonly defaultValue: string
}

const options = {
  readOnly: true,
  minimap: {
    enabled: false
  },
  renderLineHighlight: 'none',
  // https://blutorange.github.io/primefaces-monaco/typedoc/interfaces/monaco.editor.ieditorscrollbaroptions.html
  scrollbar: {
    vertical:"hidden",
    horizontal: "hidden",
    handleMouseWheel:false,
    horizontalScrollbarSize: 0,
    verticalScrollbarSize: 0
  }
}

// https://blutorange.github.io/primefaces-monaco/typedoc/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html
// https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor.IEditorScrollbarOptions.html


export function CodeEditor(props: CodeEditorProps) {
  return <Editor options={options}
                 height={(props.defaultValue.split("\n").length + 1) * 18}
                 defaultLanguage={props.language}
                 style={{padding: 0, margin: 0, overflow: 'hidden'}}
                 defaultValue={props.defaultValue} />;
}