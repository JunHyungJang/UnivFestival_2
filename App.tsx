import AppInner from './AppInner';
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}

export default App;
