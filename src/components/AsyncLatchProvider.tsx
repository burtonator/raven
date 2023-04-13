import { createContext, useCallback, useContext, useMemo } from 'react';

type Listener<V> = (value: V) => void

type PromiseWithListeners = {
  promise: Promise<unknown>
  listeners: ReadonlyArray<Listener<unknown>>
}

type LatchIndex = Readonly<{[key: string]: PromiseWithListeners}>

const LatchContext = createContext<LatchIndex>({})

// TODO: I don't think this will work because I need to register a streaming listener ...
// - I will have to register and de-register the listener but this could cause GC issues.
// - I would have to debounce cache updates too...

type Delegate<V> = (listener: Listener<V>) => Promise<V>

export function useAsyncLatchProvider<V>(): (key: string, delegate: Delegate<V>, listener: Listener<V>) => Promise<V> {

  const context = useContext(LatchContext)

  // TODO: add the listener to the index, and remove it when we are done.

  // TODO: this won't allow me to remove the listener...
  return useCallback((key, delegate, listener) => {

    const existing = context[key]

    if (existing) {
      return existing.promise
    }

    const promise = delegate()

    context[key] = {promise, listeners: [listener]}
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