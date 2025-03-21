import { IGetPageIdBySlugAdapter } from '@thebigrick/catalyst-cms-layer/types';

import getClient from '../get-client';
import getFullLocale from '../get-full-locale';

/**
 * Get the page ID by its slug
 * @param slug
 * @param locale
 * @param isPreview
 */
const getPageIdBySlug: IGetPageIdBySlugAdapter = async (
  slug: string,
  locale: string,
  isPreview: boolean,
) => {
  if (!slug) {
    return null;
  }

  const client = getClient(isPreview);

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
