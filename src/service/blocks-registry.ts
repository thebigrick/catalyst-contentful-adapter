import image from '../blocks/image';
import productsCarousel from '../blocks/products-carousel';
import richText from '../blocks/rich-text';
import { IBlockDefinition } from '../types';

import containersRegistry from './caontainers-registry';

// You can extend this object with your own blocks using Pluginzr
// NOTE: The key must correspond to the Contentful block type
const blocksRegistry: Record<string, IBlockDefinition> = {
  ...containersRegistry,
  'catalyst-products-carousel': productsCarousel,
  'catalyst-rich-text': richText,
  'catalyst-image': image,
};

export default blocksRegistry;
