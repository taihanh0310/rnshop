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
    Body
} from 'native-base'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as productActions from '../../actions/ProductActions'
import { RNCamera } from 'react-native-camera'

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
            isModalVisible: false,
            textButtonCamera: "Open Camera"
        };
        this._renderFooter = this._renderFooter.bind(this);
        this._handleRefresh = this._handleRefresh.bind(this);
        this._handleLoadMore = this._handleLoadMore.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.fetchListProduct = this.fetchListProduct.bind(this);
        this.searchResult = this.searchResult.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.onBarCodeRead = this.onBarCodeRead.bind(this)
        this.showCameraView = this.showCameraView.bind(this)
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
        let condition = {
            page: this.state.page,
            search: ''
        }
        this.props.getListProductByCondition(condition);
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

        this.fetchListProduct(condition)
        this.setState({
            loading: false,
            page: page
        })
    }

    updateSearch = (search) => {
        this.props.updateProductSearch(search)
    }

    _renderFooter = (item) => {
        if (!this.state.loadingMore) return null;

        return (
            <View
                key={'f-' + item.id.toString()}
                style={{
                    position: 'relative',
                    width: width,
                    height: height,
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    marginTop: 10,
                    marginBottom: 10,
                    borderColor: 'green'
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    }

    searchResult = () => {
        this.setState({
            loading: true,
        })

        let condition = {
            page: 1,
            search: this.props.products.search
        }

        this.fetchListProduct(condition)

        this.setState({
            loading: false,
        })
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }

    onBarCodeRead = (e) => {
        Alert.alert("Barcode value is" + e.data, "Barcode type is" + e.type);
        Vibration.vibrate(500, false);
    }

    showCameraView = () => {
        this.setState({ 
          isCameraVisible: !this.state.isCameraVisible,
          textButtonCamera: "Turn off Camera"
        });
      }

    render() {
        const { navigation, products } = this.props;
        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Input
                            placeholder="Tìm sản phẩm"
                            onChangeText={(text) => this.updateSearch(text)}
                            value={products.search}
                            autoCapitalize="none"
                            underlineColorAndroid="transparent"
                            autoFocus={false}
                            disableFullscreenUI={false}
                        />
                        <Icon name="ios-search" />
                    </Item>
                    <Button transparent onPress={this.searchResult}>
                        <Text>Tìm</Text>
                    </Button>
                    <Button transparent onPress={this.toggleModal}>
                        <Text>Camera</Text>
                    </Button>
                </Header>
                <View style={{
                    flex: 1,
                    flexGrow: 1,
                }}>
                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.isModalVisible}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Hello World!</Text>

                                    <TouchableOpacity
                                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                        onPress={this.toggleModal}
                                    >
                                        <Text style={styles.textStyle}>Hide Modal</Text>
                                    </TouchableOpacity>
                                </View>
                                {
                                    (this.state.isModalVisible)
                                        ?
                                        (
                                            <RNCamera
                                                ref={ref => {
                                                    this.camera = ref;
                                                }}
                                                onBarCodeRead={this.onBarCodeRead}
                                                style={{ flex: 0.5, width: '50%', borderWidth: 1, justifyContent: 'center', alignContent: 'center' }}
                                            >
                                                <Text style={{ backgroundColor: 'white' }}>BARCODE SCANNER</Text>
                                            </RNCamera>
                                        ) : null
                                }

                            </View>
                        </Modal>
                    </View>

                    {
                        (!this.state.loading) ?
                            (<FlatList
                                style={{
                                    flex: 1,
                                    padding: 20
                                }}
                                contentContainerStyle={{
                                    flexDirection: 'column',
                                }}
                                numColumns={1}
                                data={products.products.length > 0 ? products.products : []}
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
                                                        width: 50,
                                                        height: 50,
                                                        overflow: 'hidden',
                                                        alignItems: 'center',
                                                        backgroundColor: 'orange',
                                                        position: 'relative',
                                                        margin: 10
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
                                keyExtractor={(item, index) => {
                                    return item.id;
                                }}
                                ListFooterComponent={this._renderFooter}
                                onRefresh={this._handleRefresh}
                                refreshing={this.state.refreshing}
                                onEndReached={this._handleLoadMore}
                                onEndReachedThreshold={0.1}
                            />)
                            :
                            (<View key={"none"}>
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
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
