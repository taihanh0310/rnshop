import React, { Component } from 'react'
import {
    Dimensions,
    View,
    ScrollView,
    FlatList,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Vibration
} from 'react-native'
import {
    Container,
    Header,
    Item,
    Icon,
    Input,
    Button,
    Content,
    Card,
    CardItem,
    Spinner,
    Body,
    List,
    ListItem,
    Thumbnail,
    Text,
    Left,
    Right,
    Fab,
} from 'native-base'
const { width, height } = Dimensions.get('window')

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as productActions from '../../actions/ProductActions'
import * as categoryActions from '../../actions/CategoryActions'
import * as brandsActions from '../../actions/BrandActions'

export class HomeView extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    // 01 fetch list categories - scroll ngang
    // 02 fetch list categories - scroll ngang

    // 03 fetch list product moi

    // 03 fetch list product by category nuoc mam
    // 03 fetch list product by category nuoc ngot
    // 03 fetch list product by category ta
    // 03 fetch list product by category sua
    // 03 fetch list product by category mi tom

    render() {
        return (
            <Container>
                <Header searchBar rounded>
                </Header>
                <Content>

                </Content>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
        brands: state.brands,
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...productActions,
        ...categoryActions,
        ...brandsActions
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
