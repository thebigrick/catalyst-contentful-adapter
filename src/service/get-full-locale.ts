const getFullLocale = (locale: string): string => {
  const isoLocale = new Intl.Locale(locale);
  const maximized = isoLocale.maximize();

  return `${maximized.language}-${maximized.region}`;
};

export default getFullLocale;
