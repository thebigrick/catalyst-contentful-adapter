import { ContentfulLivePreview } from '@contentful/live-preview';
import { IFieldWrapperAdapter } from '@thebigrick/catalyst-cms-layer/types';
import React, { PropsWithChildren } from 'react';

const FieldWrapper: React.FC<PropsWithChildren<IFieldWrapperAdapter>> = ({
  children,
  fieldId,
  blockId,
  isDraftEnabled,
}) => {
  if (!isDraftEnabled) {
    return <div>children</div>;
  }

  return <div {...ContentfulLivePreview.getProps({ entryId: blockId, fieldId })}>{children}</div>;
};

export default FieldWrapper;
