import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'

export class ProductItem extends Component {
    render() {
        return (
            <View>
                <View>
                    <TouchableOpacity>
                        {/* image props */}
                        <Image/>
                    </TouchableOpacity>
                </View>
                <View>
                    <View>
                        <Text>Product name</Text>
                    </View>
                    <View>
                        <Text>Product SKU</Text>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Text>Chon</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default ProductItem
