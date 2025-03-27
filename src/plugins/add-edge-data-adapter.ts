import edgeDataAdapters from '@thebigrick/catalyst-cms-layer/edge-data-adapters';
import { ICmsEdgeDataAdapter } from '@thebigrick/catalyst-cms-layer/types';
import { valuePlugin } from '@thebigrick/catalyst-pluginizr';

import edgeDataAdapter from '../edge-data-adapter';

const addEdgeDataAdapter = valuePlugin<typeof edgeDataAdapters>({
  name: 'add-contentful-data-adapter',
  resourceId: '@thebigrick/catalyst-cms-layer/data-adapters',
  wrap: (source: Record<string, ICmsEdgeDataAdapter>) => ({
    ...source,
    contentful: edgeDataAdapter,
  }),
});

export default addEdgeDataAdapter;
