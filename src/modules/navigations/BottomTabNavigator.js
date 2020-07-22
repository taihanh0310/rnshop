import { createBottomTabNavigator } from 'react-navigation';

import HomeView from '../home/HomeView'
import ProductList from '../products/ProductList'
import BrandList from '../brands/BrandList'
import CategoryList from '../categories/CategoryList'

export default createBottomTabNavigator({
    Home: HomeView,
    Products: ProductList,
    Brands: BrandList,
    Categories: CategoryList
},
    {
        initialRouteName: 'Home',
    }
);