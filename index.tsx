import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Debug log to confirm script execution in browser console
console.log("Lumen LMS: Application mounting...");

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("Lumen LMS: Render complete.");
} else {
  console.error("Lumen LMS: Could not find root element!");
}