import { ICmsAdapter } from '@thebigrick/catalyst-cms-layer/types';

import Context from './components/context';
import FieldWrapper from './components/field-wrapper';
import RichTextRenderer from './components/rich-text-renderer';
import getPageById from './service/adapter/get-page-by-id';
import getPageIdBySlug from './service/adapter/get-page-id-by-slug';

const adapter: ICmsAdapter = {
  getPageIdBySlug,
  getPageById,
  RichTextRenderer,
  Context,
  FieldWrapper,
};

export default adapter;
