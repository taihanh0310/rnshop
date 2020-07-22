import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as productActions from '../../actions/ProductActions'

export class HomeView extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        alert("home view")
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text> HomeView </Text>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...productActions
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
