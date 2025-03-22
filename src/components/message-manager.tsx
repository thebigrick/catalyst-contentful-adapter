import { ContentfulLivePreview } from '@contentful/live-preview';
import React, { useEffect, useRef } from 'react';

export interface IMessageManagerProps {
  isDraftEnabled: boolean;
}

const MessageManager: React.FC<IMessageManagerProps> = ({ isDraftEnabled }) => {
  useEffect(() => {
    if (isDraftEnabled) {
      ContentfulLivePreview.subscribe('save', {
        callback: () => {
          window.location.reload();
        },
      });
    }
  }, [isDraftEnabled]);

  return null;
};

export default MessageManager;
