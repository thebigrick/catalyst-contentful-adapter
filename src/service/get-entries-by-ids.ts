import { ICmsContext } from '@thebigrick/catalyst-cms-layer/types';
import { Entry, EntrySkeletonType } from 'contentful';

import getClient from './get-client';
import getFullLocale from './get-full-locale';

const getEntriesByIds = async (
  ids: readonly string[],
  context: ICmsContext,
): Promise<Array<Entry<EntrySkeletonType, any>>> => {
  const client = getClient(context);

  const res = await client.getEntries({
    // @ts-expect-error: sys.id is not in the type definition
    'sys.id[in]': ids.join(','),
    locale: getFullLocale(context.locale),
  });

  return res.items;
};

export default getEntriesByIds;
