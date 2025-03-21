import React, { useEffect } from 'react';

export interface IMessageManagerProps {
  isDraftEnabled: boolean;
}

const MessageManager: React.FC<IMessageManagerProps> = ({ isDraftEnabled }) => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { origin, data } = event;

      if (origin !== 'https://app.contentful.com' || !isDraftEnabled) return;

      if (data.from === 'live-preview' && data.action === 'ENTRY_SAVED') {
        window.location.reload();
      }
    };

    window.addEventListener('message', handleMessage);

    return () => window.removeEventListener('message', handleMessage);
  }, [isDraftEnabled]);

  return null;
};

export default MessageManager;
