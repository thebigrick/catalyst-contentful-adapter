import { Entry, EntrySkeletonType } from 'contentful';

import getClient from './get-client';
import getFullLocale from './get-full-locale';

const getEntriesByIds = async (
  ids: readonly string[],
  locale: string,
  isPreview: boolean,
): Promise<Array<Entry<EntrySkeletonType, any>>> => {
  const client = getClient(isPreview);

  const res = await client.getEntries({
    // @ts-expect-error: sys.id is not in the type definition
    'sys.id[in]': ids.join(','),
    locale: getFullLocale(locale),
  });

  return res.items;
};

export default getEntriesByIds;
