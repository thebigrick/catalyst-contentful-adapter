import {
  IBlock,
  IBlockPageData,
  ICmsContext,
  IGetPageByIdAdapter,
} from '@thebigrick/catalyst-cms-layer/types';

import convertBlock from '../convert-block';
import getClient from '../get-client';
import getFullLocale from '../get-full-locale';

/**
 * Get the page by its ID
 * @param id
 * @param context
 */
const getPageById: IGetPageByIdAdapter = async (id, context) => {
  if (!id) {
    return null;
  }

  const client = getClient(context);

  const getEntry = async () => {
    try {
      // @ts-expect-error: Locale is not in the type definition
      return await client.getEntry(id, { locale: getFullLocale(context.locale) });
    } catch {
      return null;
    }
  };

  const entry = await getEntry();

  if (!entry) {
    return null;
  }

  const fullContext: ICmsContext = {
    ...context,
    rootEntityId: id,
  };

  return convertBlock<IBlockPageData>(entry, fullContext);
};

export default getPageById;
