export function useProxyURL(name: 'openai') {

  if (typeof document !== 'undefined') {
    return document.location.origin + `/api/${name}/proxy`
  }

  return undefined

}