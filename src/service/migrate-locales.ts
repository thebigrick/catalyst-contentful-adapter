import contentful from 'contentful-management';

import assertEnv from './assert-env';
import getEnvironment from './get-environment';
import getFullLocale from './get-full-locale';

const LocaleQuery = `
  query LocaleQuery {
    site {
      settings {
        locales {
          code
          isDefault
        }
      }
    }
  }
`;

const migrateLocales = async () => {
  assertEnv();

  const environment = await getEnvironment();

  const ensureLocale = async (localeConfig: contentful.CreateLocaleProps): Promise<void> => {
    const spaceLocales = await environment.getLocales();
    const exists = spaceLocales.items.some((locale) => locale.code === localeConfig.code);

    if (!exists) await environment.createLocale(localeConfig);
  };

  const ensureLocales = async (localesToAdd: contentful.CreateLocaleProps[]): Promise<void> => {
    for (const localeConfig of localesToAdd) {
      await ensureLocale(localeConfig);
    }
  };

  const graphQlEndpoint = `https://store-${process.env.BIGCOMMERCE_STORE_HASH}-${process.env.BIGCOMMERCE_CHANNEL_ID}.mybigcommerce.com/graphql`;
  const res = await fetch(graphQlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BIGCOMMERCE_STOREFRONT_TOKEN}`,
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query: LocaleQuery })
  });
  const { data } = await res.json();

  const locales = data.site.settings?.locales as Array<{
    code: string;
    isDefault: boolean;
  }>;
  const defaultLocale = locales.find((locale) => locale.isDefault)?.code || 'en';

  const localesToEnsure = locales.map((locale) => ({
    code: getFullLocale(locale.code),
    name: locale.code,
    fallbackCode: defaultLocale !== locale.code ? getFullLocale(defaultLocale) : null,
    optional: defaultLocale !== locale.code,
  }));

  await ensureLocales(localesToEnsure);
};

export default migrateLocales;
