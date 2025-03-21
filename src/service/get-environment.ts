import contentful from 'contentful-management';

import assertEnv from './assert-env';
import getSpace from './get-space';

const getEnvironment = async (): Promise<contentful.Environment> => {
  assertEnv();

  const space = await getSpace();

  return await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || '');
};

export default getEnvironment;
