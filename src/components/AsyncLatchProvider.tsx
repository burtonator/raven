import { createContext, useCallback, useContext, useMemo } from 'react';

type LatchIndex = Readonly<{[key: string]: Promise<unknown>}>

const LatchContext = createContext<LatchIndex>({})

// TODO: I don't think this will work because I need to register a streaming listener ...
// - I will have to register and de-register the listener but this could cause GC issues.
// - I would have to debounce cache updates too...

export function useAsyncLatchProvider<T>(): (key: string, delegate: () => Promise<T>) => Promise<T> {

  const context = useContext(LatchContext)

  return useCallback((key, delegate) => {

    const existing = context[key]

    if (existing) {
      return existing
    }

    const promise = delegate()

    context[key] = promise
    return promise

  }, [context])

}

interface AsyncLatchProviderProps {
  readonly children: JSX.Element
}

export function AsyncLatchProvider(props: AsyncLatchProviderProps) {

  const index = useMemo(() => {
    return {}
  }, [])

  return (
    <LatchContext.Provider value={index}>
      {props.children}
    </LatchContext.Provider>
  )

}