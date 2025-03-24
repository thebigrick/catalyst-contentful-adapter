import { IBlockCarouselData } from '@thebigrick/catalyst-cms-layer/types';
import { Entry, EntrySkeletonType } from 'contentful';

import convertBlockArray from '../../service/convert-block-array';
import { IBlockLoader } from '../../types';

const loader: IBlockLoader<IBlockCarouselData> = async (block, context, blocksLoader) => {
  return Promise.resolve({
    id: block.sys.id,
    type: 'Carousel',
    data: {
      blocks: await convertBlockArray(
        block.fields.blocks as Array<Entry<EntrySkeletonType, any>>,
        context,
        blocksLoader,
      ),
      showButtons: Boolean(block.fields.showButtons),
      showScrollbar: Boolean(block.fields.showScrollbar),
    },
  });
};

export default loader;
