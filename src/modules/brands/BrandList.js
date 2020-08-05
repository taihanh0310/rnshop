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
import * as brandsActions from '../../actions/BrandActions'
const { width, height } = Dimensions.get('window')


export class BrandList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
        this.renderItem = this.renderItem.bind(this)
    }
    componentDidMount() {
        let condition = {
            page: 1,
            per_page: 20,
            search: ''
        }

        this.props.getListBrandByCondition(condition)
    }

    renderItem = ({ item }) => {
        return (<ListItem thumbnail key={'cat-' + item.term_id}>
            <Left>
                <Thumbnail resizeMode='contain' square source={{ uri: item.brand_image.length > 0 ? item.brand_image[0] : 'https://annhienstore.com/wp-content/uploads/woocommerce-placeholder-300x300.png', cache: 'only-if-cached' }} />
            </Left>
            <Body>
                <Text numberOfLines={2}>{item.name}</Text>
            </Body>
            <Right>
                <Text numberOfLines={1}>{item.count}</Text>
            </Right>
        </ListItem>)
    }

    render() {
        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Input
                            placeholder="Tìm thương hiệu"
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
                        (this.props.brands.isLoading)
                            ?
                            (
                                <View>
                                    <Text>{this.props.brands.isLoading}</Text>
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
                                    data={this.props.brands.collection}
                                    renderItem={this.renderItem}
                                    keyExtractor={item => item.term_id}
                                    onEndReachedThreshold={0.1}
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
        brands: state.brands
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...brandsActions
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandList)
