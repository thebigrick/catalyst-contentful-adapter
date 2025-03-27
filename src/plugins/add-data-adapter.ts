import dataAdapters from '@thebigrick/catalyst-cms-layer/data-adapters';
import { ICmsDataAdapter } from '@thebigrick/catalyst-cms-layer/types';
import { valuePlugin } from '@thebigrick/catalyst-pluginizr';

import dataAdapter from '../data-adapter';

const addDataAdapter = valuePlugin<typeof dataAdapters>({
  name: 'add-contentful-data-adapter',
  resourceId: '@thebigrick/catalyst-cms-layer/data-adapters',
  wrap: (source: Record<string, ICmsDataAdapter>) => ({
    ...source,
    contentful: dataAdapter,
  }),
});

export default addDataAdapter;
