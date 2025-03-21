import { IBlock } from '@thebigrick/catalyst-cms-layer/types';
import { Entry, EntrySkeletonType } from 'contentful';
import DataLoader from 'dataloader';

import convertBlock from './convert-block';

const convertBlockArray = async (
  blocks: Array<Entry<EntrySkeletonType, any>> | undefined | null,
  locale: string,
  isPreview: boolean,
  blocksLoader: DataLoader<any, any>,
): Promise<IBlock[]> => {
  if (blocks) {
    const convertedBlocks = await Promise.all(
      blocks.map((b) => convertBlock(b, locale, isPreview, blocksLoader)),
    );

    return convertedBlocks.filter((b) => b !== null);
  }

  return [];
};

export default convertBlockArray;
