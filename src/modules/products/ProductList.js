import React, { Component } from 'react'
import {
    Dimensions,
    View,
    ScrollView,
    FlatList,
    ActivityIndicator,
    Text,
    Image,
    TouchableOpacity
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
    Body
} from 'native-base'

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
            error: null,
            search: '',
        };
        this._renderFooter = this._renderFooter.bind(this);
        this._handleRefresh = this._handleRefresh.bind(this);
        this._handleLoadMore = this._handleLoadMore.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
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

    updateSearch = (search) => {

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
        const { search } = this.state;
        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input
                            placeholder="Search"
                            onChangeText={(text) => this.updateSearch(text)}
                            value={search}
                            autoCapitalize="none"
                            underlineColorAndroid="transparent"
                            autoFocus={false}
                            disableFullscreenUI={false}
                        />
                        <Icon name="ios-people" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <View style={{ paddingBottom: 20, height: Math.round(Dimensions.get('window').height) - 70, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                    <FlatList
                        contentContainerStyle={{
                            flex: 1,
                            flexDirection: 'column',
                            height: '100%',
                            width: '100%',
                            marginBottom: 30
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
                                    <View>
                                        <Image
                                            style={{
                                                width: 66,
                                                height: 58
                                            }}
                                            resizeMode='contain'
                                            source={{ uri: item.images.length > 0 ? item.images[0].src : 'https://annhienstore.com/wp-content/uploads/woocommerce-placeholder-300x300.png' }} />
                                    </View>
                                    <View>
                                        <Text>{item.name}</Text>
                                        <Text>{item.sku}</Text>
                                        <Text>{item.price}</Text>
                                        <View>
                                            {
                                                item.categories.map((cat, indexCat) => {
                                                    return (<TouchableOpacity onPress={() =>alert(cat.id)}>
                                                        <Text>{cat.name}</Text>
                                                    </TouchableOpacity>)
                                                })
                                            }
                                        </View>

                                        <View>
                                            {
                                                item.brands.map((brand, indexBrand) => {
                                                    return (<TouchableOpacity onPress={() =>alert(brand.id)}>
                                                        <Text>{brand.name}</Text>
                                                    </TouchableOpacity>)
                                                })
                                            }
                                        </View>
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
            </Container>
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
