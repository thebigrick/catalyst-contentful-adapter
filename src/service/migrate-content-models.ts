import assertEnv from './assert-env';
import blocksRegistry from './blocks-registry';
import getEnvironment from './get-environment';

const migrateContentModels = async () => {
  assertEnv();

  const environment = await getEnvironment();

  for (const [code, def] of Object.entries(blocksRegistry)) {
    process.stdout.write(`Migrating ${code} `);
    await def.migration(environment);
    process.stdout.write('✓\n');
  }
};

export default migrateContentModels;
