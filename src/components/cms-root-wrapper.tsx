'use client';

import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';
import { ICmsRootWrapperAdapter } from '@thebigrick/catalyst-cms-layer/types';
import React, { PropsWithChildren } from 'react';

import getFullLocale from '../service/get-full-locale';

import MessageManager from './message-manager';

const CmsRootWrapper: React.FC<PropsWithChildren<ICmsRootWrapperAdapter>> = ({
  children,
  context: { isPreview, locale },
}) => {
  const fullLocale = getFullLocale(locale);

  return (
    <ContentfulLivePreviewProvider
      debugMode={false}
      enableInspectorMode={isPreview}
      enableLiveUpdates={isPreview}
      locale={fullLocale}
      targetOrigin="https://app.contentful.com"
    >
      <MessageManager isPreview={isPreview} />
      {children}
    </ContentfulLivePreviewProvider>
  );
};

export default CmsRootWrapper;
