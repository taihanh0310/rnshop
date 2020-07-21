/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
// Imports: Redux Persist Persister
import { store, persistor } from './src/store/stores';

import ProductMainView from './src/modules/products/ProductMainView';

class App extends React.Component {

  render(){
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ProductMainView/>
        </PersistGate>
      </Provider>
    )
  }
}

export default App;
