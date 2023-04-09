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
  const context = useContext(NoteContext)
  const {index} = context

  console.log("FIXME: Working with index: ", index)
  return index[name]
}

interface SmartNodeIndexProviderProps {
  readonly children: JSX.Element
}

const index = {
  "World War II": {
    name: 'World War II',
    content: "World War II or the Second World War, often abbreviated as WWII or WW2, was a global conflict that lasted from 1939 to 1945. The vast majority of the world's countries, including all of the great powers, fought as part of two opposing military alliances: the Allies and the Axis. Many participants threw their economic, industrial, and scientific capabilities behind this total war, blurring the distinction between civilian and military resources. Aircraft played a major role, enabling the strategic bombing of population centres and the delivery of the only two nuclear weapons ever used in war.",
    items: [
    ]
  },
  "United States":  {
    name: 'United States',
    content: "The United States of America (U.S.A. or USA), commonly known as the United States (U.S. or US) or America, is a country primarily located in North America. It consists of 50 states, a federal district, five major unincorporated territories, nine Minor Outlying Islands,[h] and 326 Indian reservations. The United States is also in free association with three Pacific Island sovereign states: the Federated States of Micronesia, the Marshall Islands, and the Republic of Palau. It is the world's third-largest country by both land and total area.[b] It shares land borders with Canada to its north and with Mexico to its south and has maritime borders with the Bahamas, Cuba, Russia, and other nations.[i] With a population of over 333 million,[j] it is the most populous country in the Americas and the third most populous in the world. The national capital of the United States is Washington, D.C. and its most populous city and principal financial center is New York City.",
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