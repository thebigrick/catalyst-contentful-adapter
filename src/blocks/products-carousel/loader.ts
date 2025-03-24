import { IBlockProductsCarouselData } from '@thebigrick/catalyst-cms-layer/types';

import { IBlockLoader } from '../../types';

const loader: IBlockLoader<IBlockProductsCarouselData> = (block) => {
  return Promise.resolve({
    id: block.sys.id,
    type: 'ProductsCarousel',
    data: {
      productIds: ((block.fields.products || []) as string[]).map(Number),
      showButtons: Boolean(block.fields.showButtons),
      showScrollbar: Boolean(block.fields.showScrollbar),
    },
  });
};

export default loader;
