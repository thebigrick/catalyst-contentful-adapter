import { IBlockGridData } from '@thebigrick/catalyst-cms-layer/types';
import { Entry, EntrySkeletonType } from 'contentful';

import convertBlockArray from '../../service/convert-block-array';
import { IBlockLoader } from '../../types';

const loader: IBlockLoader<IBlockGridData> = async (block, context, blocksLoader) => {
  return {
    type: 'Grid',
    id: block.sys.id,
    data: {
      columns: block.fields.columns as number,
      mdColumns: block.fields.mdColumns as number,
      lgColumns: block.fields.lgColumns as number,
      gap: block.fields.gap as number,
      blocks: await convertBlockArray(
        block.fields.blocks as Array<Entry<EntrySkeletonType, any>>,
        context,
        blocksLoader,
      ),
    },
  };
};

export default loader;
