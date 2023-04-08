import Editor from '@monaco-editor/react';
import { createStyles, makeStyles } from '@mui/styles';
import { useTheme } from '@mui/system';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {

      '& section': {
        padding: 0,
        margin: 0
      },

    },
  }),
);
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
  const classes = useStyles()

  const monacoTheme = theme.palette.mode === 'dark' ? 'vs-dark' : 'vs'

  const nrLines = props.defaultValue.split("\n").length
  const lineHeight = 18

  const height = nrLines * lineHeight

  return <Editor options={options}
                 height={height}
                 defaultLanguage={props.language}
                 theme={monacoTheme}
                 className={classes.root}
                 style={{
                   padding: 0,
                   paddingTop: 0,
                   paddingBottom: 0,
                   paddingLeft: 0,
                   paddingRight: 0,
                   margin: 0,
                   overflow: 'hidden'
                 }}
                 defaultValue={props.defaultValue} />;
}