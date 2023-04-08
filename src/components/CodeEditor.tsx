import Editor from '@monaco-editor/react';
import { useTheme } from '@mui/material';

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
  },
}

// https://blutorange.github.io/primefaces-monaco/typedoc/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html
// https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor.IEditorScrollbarOptions.html


export function CodeEditor(props: CodeEditorProps) {

  const theme = useTheme()

  const monacoTheme = theme.palette.mode === 'dark' ? 'vs-dark' : 'vs'

  return <Editor options={options}
                 height={(props.defaultValue.split("\n").length) * 18}
                 defaultLanguage={props.language}
                 theme={monacoTheme}
                 style={{padding: 0, margin: 0, overflow: 'hidden'}}
                 defaultValue={props.defaultValue} />;
}