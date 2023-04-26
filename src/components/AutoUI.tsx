import { useCallback, useState } from 'react';
import { Backdrop, LinearProgress } from '@mui/material';
import {ElementRef} from './generated-types/ElementRef'
import { AutoUIRenderer } from './AutoUIRenderer';
import AutoUIChat from './AutoUIChat';
import YAML from 'yaml';

const SPLASH_UI_YAML = `
---
Box:
    height: '100vh'
    display: flex
    flexDirection: column
    justifyContent: center
    alignItems: center
    children:
        - Typography:
            variant: h1
            children: Welcome to AutoUI
        - Box:
            width: '80%'
            display: flex
            flexDirection: column
            alignItems: center
            children:
                - Typography:
                    variant: h4
                    align: center
                    children: |
                        AutoUI allows you to generate User Interfaces using AI.
                        Just describe what you want and we will generate the page for you.
`.trim()

const SPLASH_UI = YAML.parse(SPLASH_UI_YAML)

export default function AutoUI() {

  const [executing, setExecuting] = useState<boolean>(false)

  const [main, setMain] = useState<ElementRef | undefined>(SPLASH_UI)

  const handleCode = useCallback((code: string, type: "yaml") => {
    const main = YAML.parse(code)
    setMain(main)
  }, [])

  return (
    <>
      {executing && (
        <div style={{position: 'absolute', top: 0, left: 0, zIndex: 10000, width: '100%'}}>
          <LinearProgress variant="indeterminate"/>
        </div>
      )}

      {executing && <Backdrop open={true}/>}

      {main && <AutoUIRenderer {...main}/>}

      <AutoUIChat onCode={handleCode} onExecuting={setExecuting}/>

    </>
  )

}