import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Global error handler to catch boot errors
window.onerror = (message, source, lineno, colno, error) => {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="padding: 2rem; font-family: sans-serif; color: #7f1d1d; background: #fef2f2; border: 1px solid #fee2e2; border-radius: 1rem; margin: 2rem;">
        <h1 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">System Boot Error</h1>
        <p style="font-size: 0.875rem; margin-bottom: 1rem;">The application failed to start due to a module resolution error.</p>
        <pre style="background: #ffffff; padding: 1rem; border-radius: 0.5rem; font-size: 0.75rem; overflow: auto; color: #000;">${message}</pre>
        <p style="font-size: 0.75rem; margin-top: 1rem; color: #991b1b;">URL: ${source}<br>Line: ${lineno}:${colno}</p>
        <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #1e293b; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">Retry Boot</button>
      </div>
    `;
  }
};

console.log("TinkEdge LMS: Initiating mount process...");

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("TinkEdge LMS Fatal: Root element not found.");
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("TinkEdge LMS: Application mounted successfully.");
  } catch (err: any) {
    console.error("TinkEdge LMS Mount Error:", err);
    rootElement.innerHTML = `
      <div style="padding: 2rem; font-family: sans-serif; color: #7f1d1d; background: #fef2f2; border: 1px solid #fee2e2; border-radius: 1rem; margin: 2rem;">
        <h1 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Runtime Failure</h1>
        <p style="font-size: 0.875rem; margin-bottom: 1rem;">There was an error during the render phase.</p>
        <pre style="background: #ffffff; padding: 1rem; border-radius: 0.5rem; font-size: 0.75rem; overflow: auto;">${err.message || err}</pre>
        <p style="font-size: 0.75rem; margin-top: 1rem; color: #991b1b;">Check the browser console (F12) for a full stack trace.</p>
      </div>
    `;
  }
}