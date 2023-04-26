import { Configuration, OpenAIApi } from 'openai';
import { useMemo } from 'react';

export function createOpenAIConfiguration() {

  function computeBrowserBasePath() {

    if (typeof document !== 'undefined') {
      return document.location.origin + '/api/openai/proxy'
    }

    return undefined

  }

  return new Configuration({basePath: computeBrowserBasePath()})

}

export function createOpenAIClient() {
  return new OpenAIApi(createOpenAIConfiguration())
}
export function useOpenAPI() {

  return useMemo(() => createOpenAIClient(), []);

}