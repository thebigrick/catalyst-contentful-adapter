import fs from 'node:fs';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// TODO: This is a temporary fix for the lodash error, we need to find a better solution
const fixLodashError = () => {
  const selfPath = fileURLToPath(dirname(import.meta.url));
  const catalystRoot = path.resolve(selfPath, '../../../../../');

  const middlewarePath = path.join(catalystRoot, 'core', 'middleware.ts');
  const middleware = fs.readFileSync(middlewarePath, 'utf-8');

  if (middleware.includes('unstable_allowDynamic:')) {
    throw new Error('unstable_allowDynamic already exists in middleware.ts');
  }

  // Fix by adding the following line to the middleware.ts config: unstable_allowDynamic: ['**/node_modules/lodash/_root.js'],
  const updatedMiddleware = middleware.replace(
    'export const config = {',
    `export const config = {
  // Temporary fix for lodash error in the contentful adapter
  unstable_allowDynamic: ['**/node_modules/lodash/_root.js', '**/node_modules/contentful/**'],`,
  );

  fs.writeFileSync(middlewarePath, updatedMiddleware);
};

export default fixLodashError;
