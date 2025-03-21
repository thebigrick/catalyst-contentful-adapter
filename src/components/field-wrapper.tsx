'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';
import { IFieldWrapperAdapter } from '@thebigrick/catalyst-cms-layer/types';
import React, { PropsWithChildren } from 'react';

const FieldWrapper: React.FC<PropsWithChildren<IFieldWrapperAdapter>> = ({
  children,
  fieldId,
  blockId,
  isDraftEnabled,
}) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: blockId });

  if (!isDraftEnabled) {
    return children;
  }

  return <div {...inspectorProps({ fieldId })}>{children}</div>;
};

export default FieldWrapper;
