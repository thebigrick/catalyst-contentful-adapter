import { ContentfulLivePreview } from '@contentful/live-preview';
import React, { useEffect } from 'react';

export interface IMessageManagerProps {
  isPreview: boolean;
}

const MessageManager: React.FC<IMessageManagerProps> = ({ isPreview }) => {
  useEffect(() => {
    if (isPreview) {
      ContentfulLivePreview.subscribe('save', {
        callback: () => {
          window.location.reload();
        },
      });
    }
  }, [isPreview]);

  return null;
};

export default MessageManager;
