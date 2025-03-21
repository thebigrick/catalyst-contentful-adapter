'use client';

import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';
import { ICmsContextAdapter } from '@thebigrick/catalyst-cms-layer/types';
import React, { PropsWithChildren } from 'react';

import getFullLocale from '../service/get-full-locale';

import MessageManager from './message-manager';

const Context: React.FC<PropsWithChildren<ICmsContextAdapter>> = ({
  children,
  locale,
  isDraftEnabled,
}) => {
  const fullLocale = getFullLocale(locale);

  return (
    <ContentfulLivePreviewProvider
      debugMode={true}
      enableInspectorMode={isDraftEnabled}
      enableLiveUpdates={isDraftEnabled}
      locale={fullLocale}
      targetOrigin="https://app.contentful.com"
    >
      <MessageManager isDraftEnabled={isDraftEnabled} />
      {children}
    </ContentfulLivePreviewProvider>
  );
};

export default Context;
