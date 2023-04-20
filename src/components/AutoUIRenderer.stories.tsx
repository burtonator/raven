import { Meta } from '@storybook/react';
import { AutoUIRenderer } from './AutoUIRenderer';
import YAML from 'yaml';
import { CardMedia } from '@mui/material';

export default {
  component: AutoUIRenderer,
} as Meta

const yaml = `
---
AppBar:
  position: "sticky"
  color: "default"
  children:
    - Toolbar:
        variant: "dense"
        children:
          - IconButton:
              edge: "start"
              color: "inherit"
              aria-label: "menu"
              children:
                MenuIcon
          - Typography:
              variant: "h6"
              noWrap: true
              children: "CNN"
          - Box:
              flexGrow: 1
          - Button:
              color: "inherit"
              children: "US"
          - Button:
              color: "inherit"
              children: "World"
          - Button:
              color: "inherit"
              children: "Politics"
          - Button:
              color: "inherit"
              children: "Business"
          - Button:
              color: "inherit"
              children: "Opinion"
          - Button:
              color: "inherit"
              children: "Health"
          - Button:
              color: "inherit"
              children: "Entertainment"
          - Button:
              color: "inherit"
              children: "Style"
          - Button:
              color: "inherit"
              children: "Travel"
          - Button:
              color: "inherit"
              children: "Sports"
          - Button:
              color: "inherit"
              children: "Videos"
          - Button:
              color: "inherit"
              children: "Live TV"
          - IconButton:
              color: "inherit"
              aria-label: "search"
              children:
                SearchIcon
          - IconButton:
              color: "inherit"
              aria-label: "account"
              children:
                AccountCircleIcon`

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

const yaml2 = `
CardMedia:
    component: "img"
    height: "140"
    image: "https://cdn.cnn.com/cnnnext/dam/assets/211001120000-01-afghanistan-1001-super-tease.jpg"
    alt: "Afghanistan"
`

export const Basic = () => {

  const props = YAML.parse(yaml)

  return (
    <AutoUIRenderer {...props}/>
  )
}

export const BrokenCardMedia = () => {

  const props = YAML.parse(yaml2)

  return (
    <AutoUIRenderer {...props}/>
  )
}


export const Broken = () => {
  return (
    <CardMedia component='img' height="140"
  image="https://cdn.cnn.com/cnnnext/dam/assets/211001120000-01-afghanistan-1001-super-tease.jpg"
  alt="Afghanistan"/>

)
}