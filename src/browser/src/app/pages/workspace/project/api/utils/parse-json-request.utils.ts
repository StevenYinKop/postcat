import { WHAT_TEXT_TYPE_MAP } from 'pc/browser/src/app/pages/workspace/project/api/http/test/api-test.model';
import { getQueryFromURL } from 'pc/browser/src/app/pages/workspace/project/api/utils/api.utils';

export const parseJSONRequest = (jsonStr: string) => {
  const parsedJson = JSON.parse(jsonStr);
  const resultData = {};

  for (const key in parsedJson) {
    if ((key || '').startsWith('_')) {
      continue;
    }
    const keys = key.split('.');
    let current = resultData;
    for (let i = 0; i < keys.length; i++) {
      const subKey = keys[i];
      if (!current[subKey]) {
        if (i === keys.length - 1) {
          current[subKey] = parsedJson[key][0];
        } else {
          current[subKey] = {};
        }
      }
      current = current[subKey];
    }
  }

  for (const key in parsedJson.http.headers) {
    parsedJson.http.headers[key] = parsedJson.http.headers[key][0];
  }

  return {
    method: parsedJson.http.method,
    url: parsedJson.http.uri,
    header: parsedJson.http.headers,
    body: parsedJson.http.body,
    contentType: WHAT_TEXT_TYPE_MAP.json,
    query: getQueryFromURL(parsedJson.http.uri)
  };
};
