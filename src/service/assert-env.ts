const assertEnv = () => {
  if (!process.env.CONTENTFUL_SPACE_ID) {
    throw new Error('CONTENTFUL_SPACE_ID is not set');
  }

  if (!process.env.CONTENTFUL_ENVIRONMENT) {
    throw new Error('CONTENTFUL_ENVIRONMENT is not set');
  }

  if (!process.env.CONTENTFUL_CMA_TOKEN) {
    throw new Error('CONTENTFUL_CMA_TOKEN is not set');
  }

  if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
    throw new Error('CONTENTFUL_ACCESS_TOKEN is not set');
  }

  if (!process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN) {
    throw new Error('CONTENTFUL_PREVIEW_ACCESS_TOKEN is not set');
  }

  if (!process.env.CONTENTFUL_PREVIEW_SECRET) {
    throw new Error('CONTENTFUL_PREVIEW_SECRET is not set');
  }
};

export default assertEnv;
