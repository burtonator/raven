import { createContext, useContext } from 'react';

export type MarkdownStr = string

/**
 * A reference to another note like "World War II" or "San Francisco"
 */
export type NodeNameStr = string

export interface NoteEntry {
  readonly name: NodeNameStr
  readonly content: MarkdownStr
  readonly items: ReadonlyArray<NodeNameStr>
}

export type NoteIndex = {[key: string]: NoteEntry}

export interface INoteContext {
  readonly index: NoteIndex
}

const NoteContext = createContext<INoteContext>({index: {}})

export function useSmartNote(name: string): NoteEntry | undefined {
  const index = useContext(NoteContext).index
  return index[name]
}

interface SmartNodeIndexProviderProps {
  readonly children: JSX.Element
}

const index = {
  "World War II": {
    name: 'World War II',
    content: "This has to do with WWII",
    items: [
    ]
  },
  "United States":  {
    name: 'United States',
    content: "This is the node for United States",
    items: [
    ]
  }
}

export const SmartNoteIndexProvider = (props: SmartNodeIndexProviderProps) => {
  return (
    <NoteContext.Provider value={{index}}>
      {props.children}
    </NoteContext.Provider>
  )
}