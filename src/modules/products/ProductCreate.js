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
    Content,
    Text,
    Form,
    Item,
    Input,
    Label,
    Picker,
    Button,
    Icon, 
    Spinner
} from "native-base"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as productActions from '../../actions/ProductActions'
import { getListCategoriesByCondition } from '../../actions/CategoryActions'
import commonStyles from '../../common/styles/commonStyles'

const { width, height } = Dimensions.get('window')

export class ProductCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            regular_price: 0,
            type: 'simple',
            sku: "",
            description: '',
            short_description: '',
            selected2: undefined,
            loading: false
        };
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.onValueChange2 = this.onValueChange2.bind(this)
        this.fetchListCategories = this.fetchListCategories.bind(this)
        this.openCamera = this.openCamera.bind(this)
    }

    componentDidMount() {
        // fetch list categories
        this.fetchListCategories()
    }

    handleSubmitForm = () => {
        this.setState({
            loading: true
        })
        setTimeout(() => {
            let form = {
                name: this.state.name,
                type: 'simple',
                regular_price: this.state.regular_price,
                description: this.state.description,
                short_description: this.state.short_description,
                categories: [{ id: this.state.selected2 }],
                sku: this.state.sku
            }

            this.props.createProduct(form)
            this.setState({
                loading: false
            })

            alert("tao moi thanh cong")
        }, 4000);

    }

    openCamera = () => {
        alert("open camera")
    }

    fetchListCategories() {
        let catCondition = {
            page: 1,
            per_page: 99,
            search: ''
        }

        this.props.getListCategoriesByCondition(catCondition)
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
            case 'short_description': {
                this.setState({
                    short_description: text
                })
                break;
            }
            case 'sku': {
                this.setState({
                    sku: text
                })
                break;
            }
            default:
                this.setState({
                    description: text
                })
                break;
        }
    }

    onValueChange2(value) {
        this.setState({
            selected2: value
        });
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form style={[commonStyles.defaultMargin]}>
                        <ScrollView contentContainerStyle={{ height: height - 260 }}>
                            <Item picker last rounded style={[commonStyles.defaultMargin]}>
                                <Label>Danh mục</Label>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="Chọn danh mục"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.selected2}
                                    onValueChange={(value) => this.onValueChange2(value)}
                                >
                                    {
                                        (this.props.categories.collection.length > 0)
                                            ?
                                            (
                                                this.props.categories.collection.map(function (cat, i) {
                                                    return (<Picker.Item label={cat.name} value={cat.id} key={"cat_" + i} />)
                                                })
                                            )
                                            :
                                            null
                                    }
                                </Picker>
                            </Item>

                            <Item fixedLabel last rounded style={[commonStyles.defaultMargin]}>
                                <Label>Tên sản phẩm</Label>
                                <Input
                                    clearButtonMode='while-editing'
                                    onChangeText={(text) => this.onchangeText("name", text)} />
                            </Item>
                            <Item fixedLabel last rounded style={[commonStyles.defaultMargin]}>
                                <Label>SKU</Label>
                                <Input
                                    clearButtonMode='while-editing'
                                    keyboardType='number-pad'
                                    onChangeText={(text) => this.onchangeText("sku", text)}
                                />
                            </Item>

                            <Button
                                full
                                rounded
                                onPress={() => this.openCamera()}
                                style={[commonStyles.defaultMargin]}>
                                <Text>Scan Barcode</Text>
                            </Button>

                            <Item fixedLabel last rounded style={[commonStyles.defaultMargin]}>
                                <Label>Giá bán</Label>
                                <Input
                                    clearButtonMode='while-editing'
                                    keyboardType='number-pad'
                                    onChangeText={(text) => this.onchangeText("regular_price", text)}
                                />
                            </Item>

                            <Item fixedLabel last rounded style={[commonStyles.defaultMargin]}>
                                <Label>DG ngắn</Label>
                                <Input
                                    clearButtonMode='while-editing'
                                    onChangeText={(text) => this.onchangeText("short_description", text)}
                                    multiline={true}
                                />
                            </Item>

                            <Item fixedLabel last rounded style={[commonStyles.defaultMargin]}>
                                <Label>Diễn giải</Label>
                                <Input
                                    clearButtonMode='while-editing'
                                    onChangeText={(text) => this.onchangeText("description", text)}
                                    multiline={true}
                                />
                            </Item>
                        </ScrollView>
                        <Button
                            full
                            rounded
                            success
                            onPress={() => this.handleSubmitForm()}
                            style={[commonStyles.defaultMargin]}>

                            {
                                (this.state.loading)
                                    ?
                                    (<Spinner />)
                                    :
                                    (<Text>Tạo mới</Text>)
                            }
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}



function mapStateToProps(state) {
    return {
        products: state.products,
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...productActions,
        getListCategoriesByCondition
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreate)
