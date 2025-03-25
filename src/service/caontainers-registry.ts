import carousel from '../blocks/carousel';
import category from '../blocks/category';
import grid from '../blocks/grid';
import html from '../blocks/html';
import page from '../blocks/page';
import product from '../blocks/product';
import { IBlockDefinition } from '../types';

// You can extend this object with your own blocks using Pluginzr
// Containers are blocks that can embed other blocks
// NOTE: The key must correspond to the Contentful block type
const containersRegistry: Record<string, IBlockDefinition> = {
  'catalyst-html': html,
  'catalyst-page': page,
  'catalyst-category': category,
  'catalyst-product': product,
  'catalyst-grid': grid,
  'catalyst-carousel': carousel,
};

export default containersRegistry;
