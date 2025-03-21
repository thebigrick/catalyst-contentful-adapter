import { IPageData } from '@thebigrick/catalyst-cms-layer/types';
import { Entry, EntrySkeletonType } from 'contentful';

import convertBlockArray from '../../service/convert-block-array';
import { IBlockLoader } from '../../types';

const loader: IBlockLoader<IPageData> = async (block, locale, isPreview, blockLoader) => {
  return {
    id: block.sys.id,
    type: 'Page',
    data: {
      id: block.sys.id,
      title: block.fields.title as string,
      slug: block.fields.slug as string,
      blocks: await convertBlockArray(
        block.fields.blocks as Array<Entry<EntrySkeletonType, any>>,
        locale,
        isPreview,
        blockLoader,
      ),
    },
  };
};

export default loader;
