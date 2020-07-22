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

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeView from './src/modules/home/HomeView'
import ProductList from './src/modules/products/ProductList'
import BrandList from './src/modules/brands/BrandList'
import CategoryList from './src/modules/categories/CategoryList'
const Tab = createBottomTabNavigator();

class App extends React.Component {
  constructor(props){
    super(props);
}

  render() {
    return (
      <SafeAreaView>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName="Home"
              tabBarOptions={{
                activeTintColor: '#e91e63',
              }}
            >
              <Tab.Screen name="Home" component={HomeView} />
              <Tab.Screen name="Products" component={ProductList} />
              <Tab.Screen name="Brands" component={BrandList} />
              <Tab.Screen name="Categories" component={CategoryList} />
            </Tab.Navigator>
          </NavigationContainer>
          </PersistGate>
        </Provider>
      </SafeAreaView>
    )
  }
}

export default App;
