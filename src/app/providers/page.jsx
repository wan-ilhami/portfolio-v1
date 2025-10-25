'use client';

import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes'
import { setupStore } from "../stores/page";
import LayoutWrapper from '../components/layout/wrapper'
import { useEffect } from 'react';
import ScrollProgressBar from './scroll.progress';
import { GoogleOAuthProvider } from '@react-oauth/google'


export function Providers({ children }) {
  const store = setupStore({});
  if (!store) console.error('Store not initialized');

  useEffect(() => {
    if (typeof window === "undefined") return;

    let socket;

    import("socket.io-client").then(({ default: io }) => {
      // Connect to Next.js API route
      socket = io({
        path: "/api/socket",
      });

      socket.on("connect", () => {
        console.log("Connected to Socket.IO");
      });

      socket.on("reload", () => {
        console.log("Reload event received");
        window.location.reload();
      });
    }).catch((err) => {
      console.error("Failed to load socket.io-client:", err);
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <ThemeProvider attribute="class">
          <ScrollProgressBar />
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
}
