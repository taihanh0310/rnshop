import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

export class BrandList extends Component {

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text> Brand List </Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandList)
