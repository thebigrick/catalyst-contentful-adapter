import contentful from 'contentful-management';

import assertEnv from './assert-env';
import getEnvironment from './get-environment';
import getFullLocale from './get-full-locale';
import { client } from "@bigcommerce/catalyst-client/client";
import { graphql } from "@bigcommerce/catalyst-core/client/graphql";

const LocaleQuery = graphql(`
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
`);

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

  const { data } = await client.fetch({ document: LocaleQuery });

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
