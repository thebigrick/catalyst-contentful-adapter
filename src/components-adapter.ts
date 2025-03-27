import { ICmsComponentsAdapter } from '@thebigrick/catalyst-cms-layer/types';

import CmsRootWrapper from './components/cms-root-wrapper';
import RichTextRenderer from './components/rich-text-renderer';
import fieldWrapperPropsProvider from './service/adapter/field-wrapper-props-provider';

const componentsAdapter: ICmsComponentsAdapter = {
  RichTextRenderer,
  CmsRootWrapper,
  fieldWrapperPropsProvider,
};

export default componentsAdapter;
