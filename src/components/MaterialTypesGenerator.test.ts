import {
  MaterialTypesGenerator
} from './MaterialTypesGenerator';
import fs from 'fs'

const components = `
Button
Typography
TextField
AppBar
Toolbar
IconButton
Grid
Card
List
Drawer
Checkbox
Radio
Select
MenuItem
Dialog
Snackbar
`.trim().split('\n')

describe('MaterialTypesGenerator', function() {

  it('generate', async () => {

    interface GeneratedComponentOutput {
      readonly component: string
      readonly content: string | undefined
    }

    async function doGenerate(component: string): Promise<GeneratedComponentOutput> {

      console.log('component: ' + component)

      const content = await MaterialTypesGenerator.generate(component)
      return {component, content}

      // const path = `/Users/burton/projects/raven/src/components/generated-types/${component}.txt`
      //
      // const data = await MaterialTypesGenerator.generate(component)
      //
      // if (data) {
      //   fs.writeFileSync(path, Buffer.from(data))
      // } else {
      //   throw new Error("No content for component: " + component)
      // }
      //

    }

    async function doWrite(output: GeneratedComponentOutput) {
      const path = `/Users/burton/projects/raven/src/components/generated-types/${output.component}.txt`

      if (output.content) {
        fs.writeFileSync(path, Buffer.from(output.content))
      } else {
        throw new Error("No content for component: " + output.component)
      }

    }

    const generated = await Promise.all(components.map(doGenerate))
    await Promise.all(generated.map(doWrite))

  }, 300000);

})