// FIX: Replaced placeholder content with a standard React 18 entry point.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// This Client ID must match the one used in your backend configuration (server.js).
const GOOGLE_CLIENT_ID = "455952654400-po5kkrvtkfk8ccbra02corfqdkdrpa17.apps.googleusercontent.com";

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);