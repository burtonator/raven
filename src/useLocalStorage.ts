export function useLocalStorage(key: string) {

  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key)
  }

  return null

}