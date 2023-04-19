import { Meta } from '@storybook/react';
import { AutoUI } from './AutoUI';
import YAML from 'yaml';

export default {
  component: AutoUI,
} as Meta

const yaml = `
Grid:
    container: true
    spacing: 2
    sx:
        marginTop: 10
        marginBottom: 10
    children:
        - Grid:
            item: true
            xs: 12
            sm: 6
            md: 4
            children:
                - Card:
                    sx:
                        height: '100%'
                        display: 'flex'
                        flexDirection: 'column'
                    children:
                        - CardHeader:
                            title: Basic
                            titleTypographyProps:
                                align: 'center'
                            subheaderTypographyProps:
                                align: 'center'
                            subheader: $9.99/month
                        - CardContent:
                            sx:
                                flexGrow: 1
                            children:
                                - Typography:
                                    variant: body2
                                    color: 'text.secondary'
                                    children:
                                        - "10 users included"
                                        - br()
                                        - "2 GB of storage"
                                        - br()
                                        - "Email support"
                                        - br()
                                        - "Help center access"
                                - List:
                                    sx:
                                        marginTop: 2
                                        bgcolor: 'background.paper'
                                    children:
                                        - ListItem:
                                            disableGutters: true
                                            children:
                                                - ListItemIcon:
                                                    children:
                                                        - CheckCircleIcon
                                                - ListItemText:
                                                    primary: "Feature 1"
                                        - ListItem:
                                            disableGutters: true
                                            children:
                                                - ListItemIcon:
                                                    children:
                                                        - CheckCircleIcon
                                                - ListItemText:
                                                    primary: "Feature 2"
                        - CardActions:
                            sx:
                                justifyContent: 'center'
                            children:
                                - Button:
                                    size: 'large'
                                    children: Choose Plan
        - Grid:
            item: true
            xs: 12
            sm: 6
            md: 4
            children:
                - Card:
                    sx:
                        height: '100%'
                        display: 'flex'
                        flexDirection: 'column'
                    children:
                        - CardHeader:
                            title: Pro
                            titleTypographyProps:
                                align: 'center'
                            subheaderTypographyProps:
                                align: 'center'
                            subheader: $19.99/month
                        - CardContent:
                            sx:
                                flexGrow: 1
                            children:
                                - Typography:
                                    variant: body2
                                    color: 'text.secondary'
                                    children:
                                        - "20 users included"
                                        - br()
                                        - "10 GB of storage"
                                        - br()
                                        - "Priority email support"
                                        - br()
                                        - "Help center access"
                                - List:
                                    sx:
                                        marginTop: 2
                                        bgcolor: 'background.paper'
                                    children:
                                        - ListItem:
                                            disableGutters: true
                                            children:
                                                - ListItemIcon:
                                                    children:
                                                        - CheckCircleIcon
                                                - ListItemText:
                                                    primary: "Feature 1"
                                        - ListItem:
                                            disableGutters: true
                                            children:
                                                - ListItemIcon:
                                                    children:
                                                        - CheckCircleIcon
                                                - ListItemText:
                                                    primary: "Feature 2"
                                        - ListItem:
                                            disableGutters: true
                                            children:
                                                - ListItemIcon:
                                                    children:
                                                        - CheckCircleIcon
                                                - ListItemText:
                                                    primary: "Feature 3"
                        - CardActions:
                            sx:
                                justifyContent: 'center'
                            children:
                                - Button:
                                    size: 'large'
                                    children: Choose Plan
        - Grid:
            item: true
            xs: 12
            sm: 6
            md: 4
            children:
                - Card:
                    sx:
                        height: '100%'
                        display: 'flex'
                        flexDirection: 'column'
                    children:
                        - CardHeader:
                            title: Enterprise
                            titleTypographyProps:
                                align: 'center'
                            subheaderTypographyProps:
                                align: 'center'
                            subheader: $49.99/month
                        - CardContent:
                            sx:
                                flexGrow: 1
                            children:
                                - Typography:
                                    variant: body2
                                    color: 'text.secondary'
                                    children:
                                        - "50 users included"
                                        - br()
                                        - "30 GB of storage"
                                        - br()
                                        - "Phone and email support"
                                        - br()
                                        - "Help center access"
                                        - br()
                                        - "Advanced analytics"
                                - List:
                                    sx:
                                        marginTop: 2
                                        bgcolor: 'background.paper'
                                    children:
                                        - ListItem:
                                            disableGutters: true
                                            children:
                                                - ListItemIcon:
                                                    children:
                                                        - CheckCircleIcon
                                                - ListItemText:
                                                    primary: "Feature 1"
                                        - ListItem:
                                            disableGutters: true
                                            children:
                                                - ListItemIcon:
                                                    children:
                                                        - CheckCircleIcon
                                                - ListItemText:
                                                    primary: "Feature 2"
                                        - ListItem:
                                            disableGutters: true
                                            children:
                                                - ListItemIcon:
                                                    children:
                                                        - CheckCircleIcon
                                                - ListItemText:
                                                    primary: "Feature 3"
                                        - ListItem:
                                            disableGutters: true
                                            children:
                                                - ListItemIcon:
                                                    children:
                                                        - CheckCircleIcon
                                                - ListItemText:
                                                    primary: "Feature 4"
                        - CardActions:
                            sx:
                                justifyContent: 'center'
                            children:
                                - Button:
                                    size: 'large'
                                    children: Choose Plan
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
    <AutoUI {...props}/>
  )
}
