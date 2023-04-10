import { Configuration, OpenAIApi } from 'openai';
import { useMemo } from 'react';

export function useOpenAPI() {

  function computeBrowserBasePath() {

    if (typeof document !== 'undefined') {
      return document.location.origin + '/api/openai/proxy'
    }

    return undefined

  }

  return useMemo(() => new OpenAIApi(new Configuration({basePath: computeBrowserBasePath()})), []);

}