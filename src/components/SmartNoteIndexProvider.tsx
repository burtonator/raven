import { createContext, useCallback, useContext } from 'react';
import { atom, useAtom } from 'jotai';
import {
  ISODateTimeString,
  ISODateTimeStrings
} from '../ISODateTimeStrings';

export type MarkdownStr = string

/**
 * A reference to another note like "World War II" or "San Francisco"
 */
export type NoteNameStr = string

export interface NoteEntry {
  readonly name: NoteNameStr
  readonly content: MarkdownStr
  readonly items: ReadonlyArray<NoteNameStr>
  readonly created: ISODateTimeString | undefined
  readonly model?: string
}

export type NoteIndex = {[key: string]: NoteEntry}

export interface NoteDatastore {
  readonly index: NoteIndex
  readonly writeNote: (note: NoteEntry) => void
  readonly deleteNote: (name: string) => void

}

const NoteContext = createContext<NoteDatastore>({
  index: {},
  writeNote: () => console.log('writeNote: noop...'),
  deleteNote: () => console.log('writeNote: noop...')
})

export function useSmartNoteContext() {
  return useContext(NoteContext)
}

export function useSmartNote(name: string): NoteEntry | undefined {
  const context = useContext(NoteContext)
  const {index} = context

  return index[name]
}

interface SmartNodeIndexProviderProps {
  readonly children: JSX.Element
}

// This is a poor man's database for now. Just storing to local storage.
const LOCALSTORAGE_KEY = 'raven.index'

function writeToLocalStorage(idx: NoteIndex) {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(idx))
}

function readFromLocalStorage(): NoteIndex | undefined {

  if (typeof localStorage === 'undefined') {
    return undefined
  }

  const item = localStorage.getItem(LOCALSTORAGE_KEY)

  if (! item) {
    return undefined
  }

  return JSON.parse(item)
}

const DEFAULT_INDEX: NoteIndex = {
  "World War II": {
    name: 'World War II',
    content: "World War II or the Second World War, often abbreviated as WWII or WW2, was a global conflict that lasted from 1939 to 1945. The vast majority of the world's countries, including all of the great powers, fought as part of two opposing military alliances: the Allies and the Axis. Many participants threw their economic, industrial, and scientific capabilities behind this total war, blurring the distinction between civilian and military resources. Aircraft played a major role, enabling the strategic bombing of population centres and the delivery of the only two nuclear weapons ever used in war.",
    items: [
      "Military history of the United States during World War II",
      "Nazi Germany"
    ],
    created: ISODateTimeStrings.create()
  },
  "United States":  {
    name: 'United States',
    content: "The United States of America (U.S.A. or USA), commonly known as the United States (U.S. or US) or America, is a country primarily located in North America. It consists of 50 states, a federal district, five major unincorporated territories, nine Minor Outlying Islands,[h] and 326 Indian reservations. The United States is also in free association with three Pacific Island sovereign states: the Federated States of Micronesia, the Marshall Islands, and the Republic of Palau. It is the world's third-largest country by both land and total area.[b] It shares land borders with Canada to its north and with Mexico to its south and has maritime borders with the Bahamas, Cuba, Russia, and other nations.[i] With a population of over 333 million,[j] it is the most populous country in the Americas and the third most populous in the world. The national capital of the United States is Washington, D.C. and its most populous city and principal financial center is New York City.",
    items: [
    ],
    created: ISODateTimeStrings.create()
  },
  "Military history of the United States during World War II": {
    name: 'Military history of the United States during World War II',
    content: "The military history of the United States during World War II covers the victorious Allied war against the Axis Powers, starting with the 7 December 1941 attack on Pearl Harbor and ending with the 2 September 1945 surrender of Japan. During the first two years of World War II, the United States had maintained formal neutrality, which was officially announced in the Quarantine Speech delivered by US President Franklin D. Roosevelt in 1937. While officially neutral, the US supplied Britain, the Soviet Union, and China with war materiel through the Lend-Lease Act signed into law on 11 March 1941, and deployed the US military to replace the British forces stationed in Iceland. Following the \"Greer incident\" Roosevelt publicly confirmed the \"shoot on sight\" order on 11 September 1941, effectively declaring naval war on Germany and Italy in the Battle of the Atlantic.[1] In the Pacific Theater, there was unofficial early US combat activity such as the Flying Tigers.",
    items: [],
    created: ISODateTimeStrings.create()
  },
  "Nazi Germany": {
    name: 'Nazi Germany',
    content: "Nazi Germany (officially known as the German Reich[i] from 1933 until 1943, and the Greater German Reich[j] from 1943 to 1945) was the German state between 1933 and 1945, when Adolf Hitler and the Nazi Party controlled the country, transforming it into a dictatorship. Under Hitler's rule, Germany quickly became a totalitarian state where nearly all aspects of life were controlled by the government. The Third Reich,[k] meaning \"Third Realm\" or \"Third Empire\", alluded to the Nazi claim that Nazi Germany was the successor to the earlier Holy Roman Empire (800–1806) and German Empire (1871–1918). The Third Reich, which Hitler and the Nazis referred to as the Thousand-Year Reich,[l] ended in May 1945 after 12 years when the Allies defeated Germany, ending World War II in Europe.",
    items: [],
    created: ISODateTimeStrings.create()
  }

}



const indexAtom = atom<NoteIndex>(readFromLocalStorage() ?? DEFAULT_INDEX)

export function useSmartNoteIndex() {
  return useAtom(indexAtom)
}

export const SmartNoteIndexProvider = (props: SmartNodeIndexProviderProps) => {

  const [index, setIndex] = useAtom(indexAtom)

  const writeNote = useCallback((note: NoteEntry) => {
    const key = note.name as string
    index[key] = note
    writeToLocalStorage(index)
    setIndex(index)
  }, [index, setIndex])

  const deleteNote = useCallback((name: string) => {
    delete index[name]
    writeToLocalStorage(index)
    setIndex(index)
  }, [index, setIndex])

  return (
    <NoteContext.Provider value={{index, writeNote, deleteNote}}>
      {props.children}
    </NoteContext.Provider>
  )
}