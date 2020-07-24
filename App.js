/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView } from 'react-native'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
// Imports: Redux Persist Persister
import { store, persistor } from './src/store/stores';
// import { store } from './src/store/stores'

import MainTabNavigator from './src/modules/navigations/AppNavigator'

// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import HomeView from './src/modules/home/HomeView'
// import ProductList from './src/modules/products/ProductList'
// import BrandList from './src/modules/brands/BrandList'
// import CategoryList from './src/modules/categories/CategoryList'
// const Tab = createBottomTabNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Provider store={store}>
          {/* <PersistGate loading={null} persistor={persistor}> */}
            <MainTabNavigator/>
          {/* </PersistGate> */}
        </Provider>
      </SafeAreaView>
    )
  }
}

export default App;
