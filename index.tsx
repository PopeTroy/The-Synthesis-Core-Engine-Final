import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log("Synthesis_Core: Initializing Astra Handshake...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Synthesis_Core: FATAL - #root element not found in current Astra Layout.");
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("Synthesis_Core: Mount Successful.");
} catch (err) {
  console.error("Synthesis_Core: Rendering error in Astra context:", err);
}