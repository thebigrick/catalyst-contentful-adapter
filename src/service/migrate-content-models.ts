import assertEnv from './assert-env';
import blocksRegistry from './blocks-registry';
import getEnvironment from './get-environment';

const migrateContentModels = async () => {
  assertEnv();

  const environment = await getEnvironment();

  for (const def of Object.values(blocksRegistry)) {
    await def.migration(environment);
  }
};

export default migrateContentModels;
