'use client';

import { useEffect } from 'react';

export function SocketProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let socket;
    
    import('socket.io-client').then((module) => {
      socket = module.default();
      socket.on('reload', () => window.location.reload());
    }).catch((err) => {
      console.error('Failed to load socket.io-client:', err);
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  return null;
}