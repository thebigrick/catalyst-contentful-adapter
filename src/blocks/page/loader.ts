import { IBlockPageData } from '@thebigrick/catalyst-cms-layer/types';
import { Entry, EntrySkeletonType } from 'contentful';

import convertBlockArray from '../../service/convert-block-array';
import { IBlockLoader } from '../../types';

const loader: IBlockLoader<IBlockPageData> = async (block, context, blockLoader) => {
  return {
    id: block.sys.id,
    type: 'Page',
    data: {
      title: block.fields.title as string,
      slug: block.fields.slug as string,
      blocks: await convertBlockArray(
        block.fields.blocks as Array<Entry<EntrySkeletonType, any>>,
        context,
        blockLoader,
      ),
    },
  };
};

export default loader;
