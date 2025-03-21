import adapters from '@thebigrick/catalyst-cms-layer/adapters';
import { ICmsAdapter } from '@thebigrick/catalyst-cms-layer/types';
import { valuePlugin } from '@thebigrick/catalyst-pluginizr';

import adapter from '../adapter';

const addContentfulAdapter = valuePlugin<typeof adapters>({
  name: 'add-contentful-adapter',
  resourceId: '@thebigrick/catalyst-cms-layer/adapters',
  wrap: (source: Record<string, ICmsAdapter>) => ({
    ...source,
    contentful: adapter,
  }),
});

export default addContentfulAdapter;
