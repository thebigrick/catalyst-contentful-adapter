import { IGetPageIdBySlugAdapter } from '@thebigrick/catalyst-cms-layer/types';

import getGraphQLClient from '../get-graphql-client';

/**
 * Get the page ID by its slug
 * @param slug
 * @param context
 */
const getPageIdBySlug: IGetPageIdBySlugAdapter = async (slug, context) => {
  if (!slug) {
    return null;
  }

  const client = getGraphQLClient(context);

  const query = `
    query GetPageIdBySlug($slug: String!, $preview: Boolean) {
      catalystPageCollection(where: { slug: $slug }, limit: 1, preview: $preview) {
        items {
          sys {
            id
          }
        }
      }
    }
  `;

  interface Response {
    catalystPageCollection: {
      items: Array<{
        sys: {
          id: string;
        };
      }>;
    };
  }

  try {
    const data = await client.query<Response>(query, { slug, preview: context.isPreview });

    if (data.catalystPageCollection.items.length > 0) {
      return data.catalystPageCollection.items[0].sys.id;
    }

    return null;
  } catch (error) {
    console.error('Error fetching page by slug:', error);

    return null;
  }
};

export default getPageIdBySlug;
