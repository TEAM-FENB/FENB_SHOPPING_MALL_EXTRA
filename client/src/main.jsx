import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import GlobalProvider from './components/GlobalProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);
