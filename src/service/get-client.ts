import { ContentfulClientApi, createClient } from 'contentful';

import assertEnv from './assert-env';

const clients: {
  prod: ContentfulClientApi<any> | undefined;
  preview: ContentfulClientApi<any> | undefined;
} = {
  prod: undefined,
  preview: undefined,
};

const getClient = (preview = false): ContentfulClientApi<any> => {
  assertEnv();

  const key = preview ? 'preview' : 'prod';

  if (!clients[key]) {
    clients[key] = createClient({
      space: process.env.CONTENTFUL_SPACE_ID || '',
      accessToken:
        (preview
          ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : process.env.CONTENTFUL_ACCESS_TOKEN) || '',
      host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
    });
  }

  return clients[key];
};

export default getClient;
