import { ICmsContext } from '@thebigrick/catalyst-cms-layer/types';

import assertEnv from './assert-env';

interface GraphQLClient {
  query: <T>(query: string, variables?: Record<string, any>) => Promise<T>;
}

const clients: {
  prod: GraphQLClient | undefined;
  preview: GraphQLClient | undefined;
} = {
  prod: undefined,
  preview: undefined,
};

const createGraphQLClient = (isPreview: boolean): GraphQLClient => {
  const accessToken = isPreview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN;
  const spaceId = process.env.CONTENTFUL_SPACE_ID;

  const query = async <T>(gqlQuery: string, variables?: Record<string, any>): Promise<T> => {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/master`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          query: gqlQuery,
          variables,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    return data.data;
  };

  return { query };
};

const getGraphQLClient = (context: Pick<ICmsContext, 'isPreview'>): GraphQLClient => {
  const key = context.isPreview ? 'preview' : 'prod';

  assertEnv();

  if (!clients[key]) {
    clients[key] = createGraphQLClient(context.isPreview);
  }

  return clients[key];
};

export default getGraphQLClient;
