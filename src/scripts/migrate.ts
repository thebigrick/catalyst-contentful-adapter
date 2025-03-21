import migrateContentModels from '../service/migrate-content-models';
import migrateLocales from '../service/migrate-locales';

await (async () => {
  await migrateLocales();
  await migrateContentModels();
  console.log('✓ Migration complete');
})();
