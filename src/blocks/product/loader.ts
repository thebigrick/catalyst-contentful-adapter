import { IBlockProductPageData } from '@thebigrick/catalyst-cms-layer/types';
import { Entry, EntrySkeletonType } from 'contentful';

import convertBlockArray from '../../service/convert-block-array';
import { IBlockLoader } from '../../types';

const loader: IBlockLoader<IBlockProductPageData> = async (block, context, blockLoader) => {
  return {
    id: block.sys.id,
    type: 'Product',
    data: {
      productId: block.fields.productId as number,
      header: await convertBlockArray(
        block.fields.header as Array<Entry<EntrySkeletonType, any>>,
        context,
        blockLoader,
      ),
      description: await convertBlockArray(
        block.fields.description as Array<Entry<EntrySkeletonType, any>>,
        context,
        blockLoader,
      ),
    },
  };
};

export default loader;
