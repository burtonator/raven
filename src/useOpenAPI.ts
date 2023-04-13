import { Configuration, OpenAIApi } from 'openai';
import { useMemo } from 'react';

export function createConfiguration() {

  function computeBrowserBasePath() {

    if (typeof document !== 'undefined') {
      return document.location.origin + '/api/openai/proxy'
    }

    return undefined

  }

  return new Configuration({basePath: computeBrowserBasePath()})

}

export function useOpenAPI() {


  return useMemo(() => new OpenAIApi(createConfiguration()), []);

}