import {ElementRef} from './generated-types/ElementRef'
import { Button } from '@mui/material';
import { Component } from 'react';

export type ElementToComponentMap = {
  readonly [key in keyof ElementRef]: JSX.Element
}

const elementToComponentMap: ElementToComponentMap = {
  Button: Button
}

const NotImplemented = () => {
  return (
    <div>Not implemented</div>
  )
}

export function AutoUI(props: ElementRef) {

  // get the element and map it to a component...

  const elementName = Object.keys(props)[0]

  const Component = elementToComponentMap[elementName] ?? <div>Not implemented: {elementName} </div>

  console.log("FIXME: elementName: ", elementName)

  const componentProps = props[elementName]

  return (
    <Component {...componentProps}/>
  )

}
