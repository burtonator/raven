import { Meta } from '@storybook/react';
import { AutoUIRenderer } from './AutoUIRenderer';
import YAML from 'yaml';

export default {
  component: AutoUIRenderer,
} as Meta

const yaml = `
Container:
  children:
    - form:
        children:
          - Grid:
              container: true
              spacing: 2
              children:

                - Grid:
                    item: true
                    xs: 12
                    sm: 6
                    children:
                      - TextField:
                          label: "First Name"
                          fullWidth: true

                - Grid:
                    item: true
                    xs: 12
                    sm: 6
                    children:
                      - TextField:
                          label: "Last Name"
                          fullWidth: true

                - Grid:
                    item: true
                    xs: 12
                    children:
                      - TextField:
                          label: "Street Address"
                          fullWidth: true

                - Grid:
                    item: true
                    xs: 12
                    sm: 6
                    children:
                      - TextField:
                          label: "City"
                          fullWidth: true

                - Grid:
                    item: true
                    xs: 12
                    sm: 3
                    children:
                      - TextField:
                          label: "State"
                          fullWidth: true

                - Grid:
                    item: true
                    xs: 12
                    sm: 3
                    children:
                      - TextField:
                          label: "Zip Code"
                          fullWidth: true

                - Grid:
                    item: true
                    xs: 12
                    children:
                      - Button:
                          variant: "contained"
                          color: "primary"
                          children: "Submit"
`

// const yaml = `
// Grid:
//     container: true
//     spacing: 2
//     children:
//         - Grid:
//             item: true
//             children:
//                 - Button:
//                     color: primary
//                     variant: contained
//                     children:
//                         Click Me
//         - Grid:
//             item: true
//             children:
//                 - Button:
//                     color: secondary
//                     variant: contained
//                     children:
//                         Don't Click Me
// `

// const yaml = `
// Button:
//   color: secondary
//   variant: contained
//   children:
//     Don't Click Me
// `
export const BasicButton = () => {

  const props = YAML.parse(yaml)

  return (
    <AutoUIRenderer {...props}/>
  )
}
