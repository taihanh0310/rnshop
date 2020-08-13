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
import * as categoryActions from '../../actions/CategoryActions'
const { width, height } = Dimensions.get('window')

export class CategoryList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            loading: true,
            refreshing: false,
            loadingMore: false,
            per_page: 20,
            page: 1,
            search: ''
        };
        this.renderItem = this.renderItem.bind(this)
        this.getListCategoriesByCondition = this.getListCategoriesByCondition.bind(this)
        this._handleRefresh = this._handleRefresh.bind(this)
        this._handleLoadMore = this._handleLoadMore.bind(this)
        this._renderFooter = this._renderFooter.bind(this)
    }

    /**
     * 
     */
    componentDidMount() {

        let condition = {
            page: 1,
            per_page: 20,
            search: ''
        }

        setTimeout(() => {
            this.getListCategoriesByCondition(condition)

            this.setState({
                loading: false,
            })
        }, 4000);
    }

    /**
     * 
     * @param {*} param0 
     */
    renderItem = ({ item }) => {
        return (
            <ListItem thumbnail key={'cat-' + item.id}>
                <Left>
                    <Thumbnail
                        resizeMode='contain'
                        source={{ uri: item.image != null ? item.image.src : 'https://annhienstore.com/wp-content/uploads/woocommerce-placeholder-300x300.png', cache: 'only-if-cached' }}
                    />
                </Left>
                <Body>
                    <Text numberOfLines={2}>{item.name}</Text>
                </Body>
                <Right>
                    <Text>{item.count}</Text>
                </Right>
            </ListItem>
        )
    }

    getListCategoriesByCondition(condition) {
        this.props.getListCategoriesByCondition(condition)
    }

    /**
     * 
     */
    _handleRefresh = () => {
        let condition = {
            page: 1,
            search: '',
            per_page: this.state.per_page
        }

        this.setState({
            page: 1,
            search: '',
            refreshing: true
        })

        setTimeout(() => {
            this.getListCategoriesByCondition(condition);
        }, 4000);
    }

    /**
     * 
     */
    _handleLoadMore = () => {
        let page = this.state.page + 1

        let condition = {
            page: page,
            search: this.state.search,
            search: '',
            per_page: this.state.per_page
        }
        this.setState({
            loadingMore: true
        })
        setTimeout(() => {
            this.getListCategoriesByCondition(condition)
            this.setState({
                page: page
            })
        }, 4000);
    }

    _renderFooter = ({ item }) => {
        console.log(item)
        return null
        // if (!this.state.loadingMore) return null;

        // return (
        //     <View
        //         key={'f-' + item.id.toString()}
        //         style={{
        //             position: 'relative',
        //             width: width,
        //             height: height,
        //             paddingVertical: 20,
        //             borderTopWidth: 1,
        //             marginTop: 10,
        //             marginBottom: 10,
        //             borderColor: 'green'
        //         }}
        //     >
        //         <ActivityIndicator animating size="large" />
        //     </View>
        // );
    }

    render() {
        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Input
                            placeholder="Tìm danh muc"
                            autoCapitalize="none"
                            underlineColorAndroid="transparent"
                            autoFocus={false}
                            disableFullscreenUI={false}
                        />
                        <Icon name="search" />
                    </Item>
                    <Button transparent>
                        <Text>Tìm</Text>
                    </Button>
                </Header>
                <Content>
                    {
                        (this.state.loading)
                            ?
                            (
                                <View>
                                    <Spinner color='green' />
                                </View>
                            )
                            :
                            (
                                <FlatList
                                    contentContainerStyle={{
                                        flexDirection: 'column',
                                    }}
                                    numColumns={1}
                                    data={this.props.categories.collection}
                                    renderItem={this.renderItem}
                                    keyExtractor={item => item.id}
                                    ListFooterComponent={this._renderFooter}
                                    onRefresh={this._handleRefresh}
                                    refreshing={this.state.refreshing}
                                    onEndReached={this._handleLoadMore}
                                    onEndReachedThreshold={0.5}
                                />
                            )
                    }
                </Content>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}>
                    <Icon name="add" />
                    <Button style={{ backgroundColor: '#34A34F' }} onPress={null}>
                        <Icon name="barcode" />
                    </Button>
                    <Button style={{ backgroundColor: '#3B5998' }} onPress={null}>
                        <Icon name="create" />
                    </Button>
                </Fab>
            </Container>
        )
    }
}


function mapStateToProps(state) {
    return {
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...categoryActions
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
