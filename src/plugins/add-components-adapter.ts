import componentsAdapters from '@thebigrick/catalyst-cms-layer/components-adapters';
import { ICmsComponentsAdapter } from '@thebigrick/catalyst-cms-layer/types';
import { valuePlugin } from '@thebigrick/catalyst-pluginizr';

import componentsAdapter from '../components-adapter';

const addComponentsAdapter = valuePlugin<typeof componentsAdapters>({
  name: 'add-contentful-components-adapter',
  resourceId: '@thebigrick/catalyst-cms-layer/components-adapters',
  wrap: (source: Record<string, ICmsComponentsAdapter>) => ({
    ...source,
    contentful: componentsAdapter,
  }),
});

export default addComponentsAdapter;
