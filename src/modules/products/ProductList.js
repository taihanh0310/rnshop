import React, { Component } from 'react'
import {
    Dimensions,
    View,
    ScrollView,
    FlatList,
    ActivityIndicator,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
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

const { width, height } = Dimensions.get('window')

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
        this.fetchListProduct = this.fetchListProduct.bind(this);
    }

    componentDidMount() {
        let condition = {
            page: this.state.page,
            search: this.state.search
        }
        this.fetchListProduct(condition);
    }

    fetchListProduct(condition) {

        this.props.getListProductByCondition(condition)
        this.setState({
            //adding the new data with old one available in Data Source of the List
            loading: false,
            //updating the loading state to false
        });

    }

    componentWillUnmount() {
    }

    _handleRefresh = () => {
        // let condition = {
        //     page: this.state.page,
        //     search: ''
        // }
        // this.props.getListProductByCondition(condition);
    }

    _handleLoadMore = () => {
        this.setState({
            loading: true
        })
        let page = this.state.page + 1

        let condition = {
            page: page,
            search: this.state.search
        }

        alert(condition.page);

        this.fetchListProduct(condition)
        this.setState({
            loading: false,
            page: page
        })
    }

    updateSearch = (search) => {
        this.setState({ search });
        let condition = {
            page: 1,
            search: this.state.search
        }
        if (search.length > 3) {
            this.setState({
                loading: true
            })
            this.fetchListProduct(condition)
        }
    }

    _renderFooter = () => {
        return (
            //Footer View with Load More button
            <View style={styles.footer}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={this._handleLoadMore}
                    //On Click of button calling loadMoreData function to load more data
                    style={styles.loadMoreBtn}>
                    <Text style={styles.btnText}>Load More</Text>
                    {this.state.fetching_from_server ? (
                        <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
                    ) : null}
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { search } = this.state;
        const { navigation } = this.props;
        console.log(this.props.products.products)
        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Input
                            placeholder="Tìm sản phẩm"
                            onChangeText={(text) => this.updateSearch(text)}
                            value={search}
                            autoCapitalize="none"
                            underlineColorAndroid="transparent"
                            autoFocus={false}
                            disableFullscreenUI={false}
                        />
                        <Icon name="ios-search" />
                    </Item>
                    <Button transparent>
                        <Text>Camera</Text>
                    </Button>
                    <Button transparent>
                        <Text>Tìm</Text>
                    </Button>
                </Header>
                <View style={{
                    flex: 1,
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center'
                }}>
                    {
                        (!this.state.loading) ?
                            (<FlatList
                                contentContainerStyle={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    padding: 20
                                }}
                                numColumns={2}
                                data={this.props.products.products}
                                renderItem={({ item }) => (
                                    <View 
                                        key={item.id}
                                        style={{
                                            marginTop: 25,
                                            width: Math.round(width / 2),
                                            marginBottom: 25
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
                                                            return (<TouchableOpacity onPress={() => alert(cat.id)}>
                                                                <Text>{cat.name}</Text>
                                                            </TouchableOpacity>)
                                                        })
                                                    }
                                                </View>

                                                <View>
                                                    {
                                                        item.brands.map((brand, indexBrand) => {
                                                            return (<TouchableOpacity onPress={() => alert(brand.id)}>
                                                                <Text>{brand.name}</Text>
                                                            </TouchableOpacity>)
                                                        })
                                                    }
                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate('ProductDetail', { item: item })}>
                                                    <Text >Go to Detail Screen</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )}
                                keyExtractor={item => item.id.toString()}
                                ListFooterComponent={this._renderFooter}
                                onRefresh={this._handleRefresh}
                                refreshing={this.state.refreshing}
                                // onEndReached={this._handleLoadMore}
                                onEndReachedThreshold={0.5}
                            />)
                            :
                            (<View>
                                <Text style={{ alignSelf: 'center' }}>Loading beers</Text>
                                <ActivityIndicator />
                            </View>)
                    }

                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
    },
    item: {
        padding: 10,
    },
    separator: {
        height: 0.5,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    text: {
        fontSize: 15,
        color: 'black',
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#800000',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
});

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
