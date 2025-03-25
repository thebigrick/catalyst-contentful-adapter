import { IGetPageIdBySlugAdapter } from '@thebigrick/catalyst-cms-layer/types';

import getClient from '../get-client';

/**
 * Get the page ID by its slug
 * @param slug
 * @param context
 */
const getPageIdBySlug: IGetPageIdBySlugAdapter = async (slug, context) => {
  if (!slug) {
    return null;
  }

  const client = getClient(context);

  const entries = await client.getEntries({
    content_type: 'catalyst-page',
    'fields.slug': slug,
    limit: 1,
  });

  if (entries.items.length > 0) {
    return entries.items[0].sys.id;
  }

  return null;
};

export default getPageIdBySlug;
