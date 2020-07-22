import React, { Component } from 'react'
import {
    Dimensions,
    View,
    ScrollView,
    FlatList,
    ActivityIndicator,
    Text,
    Image
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as productActions from '../../actions/ProductActions'

export class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1,
            loading: true,
            loadingMore: false,
            filtering: false,
            refreshing: false,
            error: null
        };
        this._renderFooter = this._renderFooter.bind(this);
        this._handleRefresh = this._handleRefresh.bind(this);
        this._handleLoadMore = this._handleLoadMore.bind(this);
    }

    async componentDidMount() {
        await this.props.getListProductByCondition(null);
        console.log(this.props.products)
    }

    componentWillUnmount() {
    }

    _handleRefresh = () => {
        alert("refresh")
    }

    _handleLoadMore = () => {
        alert("load more")
    }

    _renderFooter = () => {
        if (!this.state.loadingMore) return null;

        return (
            <View
                style={{
                    position: 'relative',
                    width: width,
                    height: height,
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    marginTop: 10,
                    marginBottom: 10,
                    borderColor: colors.veryLightPink
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    contentContainerStyle={{
                        flex: 1,
                        flexDirection: 'column',
                        height: '100%',
                        width: '100%'
                    }}
                    numColumns={2}
                    data={this.props.products.products}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                marginTop: 25,
                                width: '50%'
                            }}
                        >
                            <View>
                                <Text>{item.name}</Text>
                                <View>
                                    <Image
                                        style={{
                                            width: 66,
                                            height: 58
                                        }}
                                        resizeMode='contain'
                                        source={{ uri: item.images.length > 0 ? item.images[0].src : 'https://annhienstore.com/wp-content/uploads/woocommerce-placeholder-300x300.png' }} />
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={item => item.id.toString()}
                    ListFooterComponent={this._renderFooter}
                    onRefresh={this._handleRefresh}
                    refreshing={this.state.refreshing}
                    onEndReached={this._handleLoadMore}
                    onEndReachedThreshold={0.5}
                    initialNumToRender={10}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
