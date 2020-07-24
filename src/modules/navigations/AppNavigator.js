import React, { Component } from 'react'
import { TouchableOpacity, Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'

import HomeView from '../home/HomeView'
import ProductList from '../products/ProductList'
import ProductDetail from '../products/ProductDetail'
import ProductCreate from '../products/ProductCreate'

import BrandList from '../brands/BrandList'
import CategoryList from '../categories/CategoryList'

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function MainStackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='Products'
        >
            <Stack.Screen
                name='Products'
                component={ProductList}
                options={{
                    headerRight: () => (
                        <TouchableOpacity onPress={() => alert('create new screen')}>
                            <Text>+</Text>
                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name='ProductCreate'
                component={ProductCreate}
                options={({ route }) => ({
                    title: route.params.item.name
                })}
            />

            <Stack.Screen
                name='ProductDetail'
                component={ProductDetail}
                options={({ route }) => ({
                    title: route.params.item.name
                })}
            />
        </Stack.Navigator>
    )
}

function MainTabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Products"
                tabBarOptions={{
                    activeTintColor: '#e91e63',
                }}
            >
                <Tab.Screen name="Home" component={HomeView} />
                <Tab.Screen name="Products" component={MainStackNavigator} />
                <Tab.Screen name="Brands" component={BrandList} />
                <Tab.Screen name="Categories" component={CategoryList} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default MainTabNavigator