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

        this.props.getListCategoriesByCondition(condition)
    }

    renderItem = ({ item }) => {
        return (
            <Card key={'cat-' + item.id}>
                <CardItem header>
                    <Text>{item.name}</Text>
                </CardItem>
                <CardItem cardBody>
                    <Image 
                    resizeMode='contain'
                    source={{ uri: item.image != null ? item.image.src : 'https://annhienstore.com/wp-content/uploads/woocommerce-placeholder-300x300.png', cache: 'only-if-cached' }} 
                    style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
            </Card>
        )
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
                        (this.props.categories.isLoading)
                            ?
                            (
                                <View>
                                    <Text>{this.props.categories.isLoading}</Text>
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
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...categoryActions
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
