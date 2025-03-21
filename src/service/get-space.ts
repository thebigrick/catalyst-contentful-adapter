import contentful from 'contentful-management';

import assertEnv from './assert-env';

const getSpace = async (): Promise<contentful.Space> => {
  assertEnv();

  // eslint-disable-next-line import/no-named-as-default-member
  const client: contentful.ClientAPI = contentful.createClient({
    accessToken: process.env.CONTENTFUL_CMA_TOKEN || '',
  });

  return await client.getSpace(process.env.CONTENTFUL_SPACE_ID || '');
};

export default getSpace;
