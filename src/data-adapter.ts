import { ICmsDataAdapter } from '@thebigrick/catalyst-cms-layer/types';

import getCategoryBySlug from './service/adapter/get-category-by-slug';
import getPageById from './service/adapter/get-page-by-id';
import getProductBySlug from './service/adapter/get-product-by-slug';

const dataAdapter: ICmsDataAdapter = {
  getPageById,
  getCategoryBySlug,
  getProductBySlug,
};

export default dataAdapter;
