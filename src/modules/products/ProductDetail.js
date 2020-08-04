import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    StyleSheet,
    TextInput
}
    from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as productActions from '../../actions/ProductActions'

const { width, height } = Dimensions.get('window')

export class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            regular_price: 0,
            sku: ""
        };
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.renderEmpty = this.renderEmpty.bind(this)
        this.renderProductDetail = this.renderProductDetail.bind(this)
    }

    componentDidMount() {
        const { item } = this.props.route.params
        this.setState({
            name: item.name,
            regular_price: item.regular_price,
            sku: item.sku
        })
    }

    handleSubmitForm = (id, price, name) => {
        alert(name)
        this.props.updateProductPrice(id, price, name + " update")
    }

    renderEmpty() {
        return null
    }

    onchangeText = (object_key, text) => {
        switch (object_key) {
            case "name":
                this.setState({
                    name: text
                })
                break;
            case "regular_price":
                this.setState({
                    regular_price: text
                })
                break;
            default:
                this.setState({
                    sku: text
                })
                break;
        }
        console.log(text)
    }

    renderProductDetail(productDetail) {
        return (
            <View>
                <View>
                    <Image source={{ uri: 'https://annhienstore.com/wp-content/uploads/woocommerce-placeholder-300x300.png' }} />
                </View>
                <View>
                    <View>
                        <View>
                            <TextInput 
                                value={this.state.name} 
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} 
                                onChangeText={(text) => this.onchangeText("name", text)}
                                />
                        </View>
                        <View>
                            <TextInput value={this.state.sku} style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={(text) => this.onchangeText("sku", text)}/>
                        </View>
                        <View>
                            <TextInput value={this.state.regular_price} style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={(text) => this.onchangeText("regular_price", text)}/>
                        </View>
                        <View>
                            <View>
                                <TouchableOpacity>
                                    <Text>
                                        Quay lai
                                </Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => this.handleSubmitForm(productDetail.id, this.state.regular_price, this.state.name)}>
                                    <Text>Cap nhat</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const productDetail = this.props.products.product;
        if (
            Object.keys(productDetail).length === 0 &&
            productDetail.constructor === Object
        ) {
            return this.renderEmpty();
        } else {
            return this.renderProductDetail(productDetail);
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
