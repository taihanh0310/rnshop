import React, { Component } from 'react'
import {
    Dimensions,
    View,
    ScrollView,
    FlatList,
    ActivityIndicator,
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
    Body,
    List,
    ListItem,
    Thumbnail,
    Text,
    Left,
    Right,
    Fab,
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
            textButtonCamera: "Open Camera",
            active: false
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
        this.gotoProductDetail = this.gotoProductDetail.bind(this)
        this.gotoCreateNewProduct = this.gotoCreateNewProduct.bind(this)
        this.gotoProductBarcode = this.gotoProductBarcode.bind(this)
        this.renderProductItem = this.renderProductItem.bind(this)
    }

    componentDidMount() {
        let condition = {
            page: this.state.page,
            search: this.state.search
        }
        this.fetchListProduct(condition)
    }

    fetchListProduct(condition) {

        this.props.getListProductByCondition(condition)
        this.setState({
            //adding the new data with old one available in Data Source of the List
            loading: false,
            //updating the loading state to false
        })
    }

    componentWillUnmount() {
    }

    /**
     * 
     */
    gotoProductDetail = (detail) => {
        const { navigate } = this.props.navigation

        this.props.selectProductDetail(detail)
        navigate('ProductDetail', { item: detail })
    }

    gotoCreateNewProduct = () => {
        const { navigate } = this.props.navigation
        navigate('ProductCreate')
    }

    gotoProductBarcode = () => {
        const { navigate } = this.props.navigation
        navigate('ProductScanRNCamera')
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

    renderProductItem = ({ item }) => {
        return (<ListItem thumbnail onPress={() => this.gotoProductDetail(item)} key={item.id}>
            <Left>
                <Thumbnail 
                    resizeMode='contain' 
                    square 
                    source={{ uri: item.images.length > 0 ? item.images[0].src : 'https://annhienstore.com/wp-content/uploads/woocommerce-placeholder-300x300.png', cache: 'only-if-cached' }} />
            </Left>
            <Body>
                <Text numberOfLines={2}>{item.name}</Text>
                <Text note numberOfLines={1}>{item.sku}</Text>
            </Body>
            <Right>
                <Text numberOfLines={1}>{item.regular_price}</Text>
            </Right>
        </ListItem>)
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
        this.setState({ isModalVisible: !this.state.isModalVisible })
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
        const { products } = this.props;
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
                        <Icon name="search" />
                    </Item>
                    <Button transparent onPress={this.searchResult}>
                        <Text>Tìm</Text>
                    </Button>
                </Header>
                <View style={{
                    flex: 1,
                    flexGrow: 1,
                }}>
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
                                renderItem={this.renderProductItem}
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
                            (<Content>
                                <Spinner color='green'/>
                            </Content>)
                    }

                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: '#5067FF' }}
                        position="bottomRight"
                        onPress={() => this.setState({ active: !this.state.active })}>
                        <Icon name="add" />
                        {/* <Button style={{ backgroundColor: '#34A34F' }} onPress={this.toggleModal}>
                            <Icon name="barcode" />
                        </Button> */}
                        <Button style={{ backgroundColor: '#34A34F' }} onPress={this.gotoProductBarcode}>
                            <Icon name="barcode" />
                        </Button>
                        <Button style={{ backgroundColor: '#3B5998' }} onPress={this.gotoCreateNewProduct}>
                            <Icon name="create" />
                        </Button>
                    </Fab>
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
