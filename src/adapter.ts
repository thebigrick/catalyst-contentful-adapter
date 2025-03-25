import { ICmsAdapter } from '@thebigrick/catalyst-cms-layer/types';

import CmsRootWrapper from './components/cms-root-wrapper';
import RichTextRenderer from './components/rich-text-renderer';
import fieldWrapperPropsProvider from './service/adapter/field-wrapper-props-provider';
import getCategoryBySlug from './service/adapter/get-category-by-slug';
import getPageById from './service/adapter/get-page-by-id';
import getPageIdBySlug from './service/adapter/get-page-id-by-slug';
import getProductBySlug from './service/adapter/get-product-by-slug';

const adapter: ICmsAdapter = {
  getPageIdBySlug,
  getPageById,
  getCategoryBySlug,
  getProductBySlug,
  RichTextRenderer,
  CmsRootWrapper,
  fieldWrapperPropsProvider,
};

export default adapter;
