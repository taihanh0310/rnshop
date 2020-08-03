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
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.renderEmpty = this.renderEmpty.bind(this)
        this.renderProductDetail = this.renderProductDetail.bind(this)
    }

    componentDidMount() {

    }

    handleSubmitForm = () => {

    }

    renderEmpty() {
        return null
    }

    renderProductDetail(productDetail) {
        <View>
            <View>
                <Image source={{ uri: null }} />
            </View>
            <View>
                <View>
                    <View>
                        <TextInput />
                    </View>
                    <View>
                        <TextInput />
                    </View>
                    <View>
                        <TextInput />
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Text>
                                Quay lai
                                </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.handleSubmitForm}>
                            <Text>Cap nhat</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    }

    render() {
        const productDetail = this.props.product;
        console.log(productDetail);
        return null;
        // if (
        //     Object.keys(productDetail).length === 0 &&
        //     productDetail.constructor === Object
        // ) {
        //     return this.renderEmpty();
        // } else {
        //     return this.renderProductDetail(productDetail);
        // }
    }
}



function mapStateToProps(state) {
    return {
        product: state.product
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...productActions
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
