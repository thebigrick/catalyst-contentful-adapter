import { IBlockCategoryPageData } from '@thebigrick/catalyst-cms-layer/types';
import { Entry, EntrySkeletonType } from 'contentful';

import convertBlockArray from '../../service/convert-block-array';
import { IBlockLoader } from '../../types';

const loader: IBlockLoader<IBlockCategoryPageData> = async (block, context, blockLoader) => {
  return {
    id: block.sys.id,
    type: 'Category',
    data: {
      categoryId: block.fields.categoryId as number,
      header: await convertBlockArray(
        block.fields.header as Array<Entry<EntrySkeletonType, any>>,
        context,
        blockLoader,
      ),
    },
  };
};

export default loader;
