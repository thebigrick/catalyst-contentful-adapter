import {
  IBlock,
  IBlockPageData,
  ICmsContext,
  IGetCategoryBySlugAdapter,
} from '@thebigrick/catalyst-cms-layer/types';

import convertBlock from '../convert-block';
import getClient from '../get-client';

/**
 * Get the page by its ID
 * @param id
 * @param context
 */
const getCategoryBySlug: IGetCategoryBySlugAdapter = async (
  id: number, // BigCommerce ID
  context,
) => {
  if (!id) {
    return null;
  }

  const client = getClient(context);

  const entries = await client.getEntries({
    content_type: 'catalyst-category',
    'fields.categoryId': id,
    limit: 1,
  });

  if (entries.items.length > 0) {
    const entry = entries.items[0];

    const fullContext: ICmsContext = {
      ...context,
      rootEntityId: entry.sys.id,
    };

    return convertBlock(entry, fullContext);
  }

  return null;
};

export default getCategoryBySlug;
