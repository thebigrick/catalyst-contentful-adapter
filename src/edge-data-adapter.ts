import { ICmsEdgeDataAdapter } from '@thebigrick/catalyst-cms-layer/types';

import getPageIdBySlug from './service/adapter/get-page-id-by-slug';

const edgeDataAdapter: ICmsEdgeDataAdapter = {
  getPageIdBySlug,
};

export default edgeDataAdapter;
