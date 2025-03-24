import { IBlock, ICmsContext } from '@thebigrick/catalyst-cms-layer/types';
import { Entry, EntrySkeletonType } from 'contentful';
import DataLoader from 'dataloader';

import convertBlock from './convert-block';

const convertBlockArray = async (
  blocks: Array<Entry<EntrySkeletonType, any>> | undefined | null,
  context: ICmsContext,
  blocksLoader: DataLoader<any, any>,
): Promise<IBlock[]> => {
  if (blocks) {
    const convertedBlocks = await Promise.all(
      blocks.map((b) => convertBlock(b, context, blocksLoader)),
    );

    // Return only existing blocks and in the original sort order
    return convertedBlocks
      .filter((b) => b !== null)
      .sort(
        (a, b) =>
          blocks.findIndex((block) => block.sys.id === a.id) -
          blocks.findIndex((block) => block.sys.id === b.id),
      );
  }

  return [];
};

export default convertBlockArray;
