import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import GlobalStyle from './components/GlobalStyle/GlobalStyle';
import { store } from './store/configureStore';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <GlobalStyle>
      <App />
    </GlobalStyle>
  </Provider>
);
