const configWrapper = (nextConfig) => {
  console.log('Using Contentful CMS adapter by TheBigRick <riccardo.tempesta@bigcommerce.com>');

  return {
    ...nextConfig,
    images: {
      ...nextConfig.images,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.ctfassets.net',
        },
      ],
    },
    async headers() {
      const headers = await nextConfig.headers();

      return [
        ...(headers || {}),
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN',
            },
            {
              key: 'Content-Security-Policy',
              value: `frame-ancestors 'self' https://app.contentful.com;`,
            },
          ],
        },
      ];
    },
  };
};

module.exports = configWrapper;
