import { ICmsContext } from '@thebigrick/catalyst-cms-layer/types';
import { ContentfulClientApi, createClient } from 'contentful';

import assertEnv from './assert-env';

const clients: {
  prod: ContentfulClientApi<any> | undefined;
  preview: ContentfulClientApi<any> | undefined;
} = {
  prod: undefined,
  preview: undefined,
};

const getClient = (context: Pick<ICmsContext, 'isPreview'>): ContentfulClientApi<any> => {
  assertEnv();

  const key = context.isPreview ? 'preview' : 'prod';

  if (!clients[key]) {
    clients[key] = createClient({
      space: process.env.CONTENTFUL_SPACE_ID || '',
      accessToken:
        (context.isPreview
          ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : process.env.CONTENTFUL_ACCESS_TOKEN) || '',
      host: context.isPreview ? 'preview.contentful.com' : 'cdn.contentful.com',
    });
  }

  return clients[key];
};

export default getClient;
