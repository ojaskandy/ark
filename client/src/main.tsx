import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './hooks/use-auth';
import { ThemeProvider } from "./hooks/use-theme";
import "./index.css";

// —————————— OVERRIDE window.open + HANDLE DEEP-LINK ——————————
if ((window as any).Capacitor?.Plugins?.Browser) {
  console.log('🛠️ OVERRIDE: installing window.open override');
  (window as any).open = (url: string) => {
    console.log('🛠️ OVERRIDE: window.open called with:', url);
    (window as any).Capacitor.Plugins.Browser.open({ url });
    return { focus: () => {}, close: () => {} };
  };

  console.log('🛠️ LISTENER: installing magicLinkHandled listener');
  window.addEventListener('magicLinkHandled', async () => {
    console.log('🛠️ EVENT: magicLinkHandled fired');
    try {
      await (window as any).Capacitor.Plugins.Browser.close();
      console.log('🛠️ ACTION: Browser.close() succeeded');
    } catch (e) {
      console.error('🛠️ ACTION: Browser.close() FAILED', e);
    }
    console.log('🛠️ NAVIGATE: to /app');
    window.location.href = '/app';
  });
}

if (
  typeof window !== 'undefined' &&
  (window as any).Capacitor?.Plugins?.Browser
) {
  // 1️⃣ Override window.open so Magic SDK pages load in-app
  (window as any).open = (url: string) => {
    (window as any).Capacitor.Plugins.Browser.open({ url });
    // Return dummy object to satisfy Magic SDK
    return { focus: () => {}, close: () => {} };
  };

  // 2️⃣ Listen for our native deep-link event
  window.addEventListener('magicLinkHandled', async () => {
    try {
      await (window as any).Capacitor.Plugins.Browser.close();
    } catch (err) {
      console.error('Failed to close in-app browser:', err);
    }
    window.location.href = '/app';
  });
}

// —————————— GLOBAL CSS ——————————

const globalStyle = document.createElement('style');
globalStyle.textContent = `
  body { font-family: 'Roboto', sans-serif; background-color: hsl(var(--background)); color: hsl(var(--foreground)); }
  .camera-container { position: relative; overflow: hidden; border-radius: 8px; }
  canvas { position: absolute; top: 0; left: 0; }
  .loader { border: 4px solid rgba(3,218,198,0.3); border-radius: 50%; border-top: 4px solid #03DAC6; width:40px; height:40px; animation: spin 1s linear infinite; }
  @keyframes spin { 0% { transform:rotate(0deg); } 100% { transform:rotate(360deg); } }
`;
document.head.appendChild(globalStyle);

// —————————— MOUNT REACT ——————————

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
