import { MutableRefObject, useCallback, useRef, useState } from 'react';

export type UseStateRef<V> = Readonly<[V, (newValue: V) => void, MutableRefObject<V>]>

export function useStateRef<V>(initialValue: V): UseStateRef<V> {

  const [value, setValueDelegate] = useState<V>(initialValue)
  const valueRef = useRef<V>(initialValue)

  const setValue = useCallback((newValue: V) => {
    setValueDelegate(newValue)
    valueRef.current = newValue
  }, [])

  return [value, setValue, valueRef]

}