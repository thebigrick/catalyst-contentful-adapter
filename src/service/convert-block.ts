import { IBlock } from '@thebigrick/catalyst-cms-layer/types';
import { Entry, EntrySkeletonType } from 'contentful';
import DataLoader from 'dataloader';

import getBlockByType from './get-block-by-type';
import getEntriesByIds from './get-entries-by-ids';

const convertBlock = async <TData = Record<string, any>>(
  block: Entry<EntrySkeletonType, any>,
  locale: string,
  isPreview: boolean,
  existingBlocksLoader?: DataLoader<any, any>,
): Promise<IBlock<TData> | null> => {
  // The data loader is used to batch requests for blocks
  const createBlocksLoader = () => {
    return new DataLoader(async (keys: readonly string[]) =>
      getEntriesByIds(keys, locale, isPreview),
    );
  };

  const blocksLoader = existingBlocksLoader ?? createBlocksLoader();

  // @ts-expect-error: linkType is not in the type definition
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (block.sys.type === 'Link' && (block.sys as any).linkType === 'Entry') {
    const entryId = block.sys.id;
    const linkedBlock = (await blocksLoader.load(entryId)) as Entry<EntrySkeletonType, any>;

    return convertBlock(linkedBlock, locale, isPreview, blocksLoader);
  }

  const type = block.sys.contentType.sys.id;

  const def = getBlockByType(type);

  return await def.loader(block, locale, isPreview, blocksLoader);
};

export default convertBlock;
