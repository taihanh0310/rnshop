import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeView from '../home/HomeView'
import ProductList from '../products/ProductList'
import BrandList from '../brands/BrandList'
import CategoryList from '../categories/CategoryList'


const Tab = createBottomTabNavigator();
const myBottomTab = () => {
    return (
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
    )
}
export default myBottomTab
