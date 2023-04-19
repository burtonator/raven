import { Meta } from '@storybook/react';
import { AutoUIRenderer } from './AutoUIRenderer';
import YAML from 'yaml';

export default {
  component: AutoUIRenderer,
} as Meta

const yaml = `
---
Box: 
  children: 
    - AppBar:
        position: fixed
        color: primary
        children:
            - Toolbar:
                variant: dense
                disableGutters: true
                children:
                    - Typography:
                        variant: h6
                        children: "Cancer Research Platform"
                    - IconButton:
                        edge: end
                        color: inherit
                        aria-label: account
                        children:
                            - Avatar:
                                alt: User Avatar
                                src: "https://cdn.pixabay.com/photo/2016/03/31/20/27/avatar-1295773_960_720.png"
    - List:
        dense: true
        children:
            - ListItem:
                button: true
                selected: true
                children:
                    - ListItemText:
                        primary: "Dashboard"
                    - ListItemIcon:
                        children:
                            - DashboardIcon
            - ListItem:
                button: true
                children:
                    - ListItemText:
                        primary: "Patients"
                    - ListItemIcon:
                        children:
                            - PeopleIcon
            - ListItem:
                button: true
                children:
                    - ListItemText:
                        primary: "Cases"
                    - ListItemIcon:
                        children:
                            - AssignmentIcon
            - ListItem:
                button: true
                children:
                    - ListItemText:
                        primary: "Studies"
                    - ListItemIcon:
                        children:
                            - LibraryBooksIcon
    - Grid:
        container: true
        spacing: 2
        children:
            - Grid:
                item: true
                md: 6
                children:
                    - Paper:
                        children:
                            - Typography:
                                variant: h6
                                children: "Recent Cases"
                            - List:
                                children:
                                    - ListItem:
                                        button: true
                                        children:
                                            - ListItemText:
                                                primary: "Patient A"
                                                secondary: "Breast Cancer"
                                                primaryTypographyProps:
                                                    variant: subtitle1
                                                secondaryTypographyProps:
                                                    variant: body2
                                            - ListItemSecondaryAction:
                                                children:
                                                    - IconButton:
                                                        edge: end
                                                        children:
                                                            - DeleteIcon
                                    - ListItem:
                                        button: true
                                        children:
                                            - ListItemText:
                                                primary: "Patient B"
                                                secondary: "Lung Cancer"
                                                primaryTypographyProps:
                                                    variant: subtitle1
                                                secondaryTypographyProps:
                                                    variant: body2
                                            - ListItemSecondaryAction:
                                                children:
                                                    - IconButton:
                                                        edge: end
                                                        children:
                                                            - DeleteIcon
                        variant: outlined
            - Grid:
                item: true
                md: 6
                children:
                    - Paper:
                        children:
                            - Typography:
                                variant: h6
                                children: "Upcoming Studies"
                            - List:
                                children:
                                    - ListItem:
                                        button: true
                                        children:
                                            - ListItemText:
                                                primary: "Study A"
                                                secondary: "Phase 2 Clinical Trial"
                                                primaryTypographyProps:
                                                    variant: subtitle1
                                                secondaryTypographyProps:
                                                    variant: body2
                                            - ListItemSecondaryAction:
                                                children:
                                                    - IconButton:
                                                        edge: end
                                                        children:
                                                            - DeleteIcon
                                    - ListItem:
                                        button: true
                                        children:
                                            - ListItemText:
                                                primary: "Study B"
                                                secondary: "Preclinical Research"
                                                primaryTypographyProps:
                                                    variant: subtitle1
                                                secondaryTypographyProps:
                                                    variant: body2
                                            - ListItemSecondaryAction:
                                                children:
                                                    - IconButton:
                                                        edge: end
                                                        children:
                                                            - DeleteIcon
                        variant: outlined
    - Fab:
        color: primary
        variant: extended
        children:
            - AddIcon
        sx:
            position: 'fixed'
            bottom: 16
            right: 16

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
