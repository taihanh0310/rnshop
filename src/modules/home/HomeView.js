import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class HomeView extends Component {
    constructor(props){

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
            <View>
                <Text> HomeView </Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
