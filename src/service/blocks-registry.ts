import carousel from '../blocks/carousel';
import grid from '../blocks/grid';
import html from '../blocks/html';
import image from '../blocks/image';
import page from '../blocks/page';
import productsCarousel from '../blocks/products-carousel';
import richText from '../blocks/rich-text';
import { IBlockDefinition } from '../types';

// You can extend this object with your own blocks using Pluginzr
// NOTE: The key must correspond to the Contentful block type
const blocksRegistry: Record<string, IBlockDefinition> = {
  'catalyst-html': html,
  'catalyst-page': page,
  'catalyst-products-carousel': productsCarousel,
  'catalyst-rich-text': richText,
  'catalyst-image': image,
  'catalyst-grid': grid,
  'catalyst-carousel': carousel,
};

export default blocksRegistry;
