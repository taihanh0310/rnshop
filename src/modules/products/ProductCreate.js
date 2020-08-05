import React, { Component } from 'react'
import { Dimensions,
    View,
    ScrollView,
    FlatList,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Vibration } from 'react-native'
import { Container, 
    Content, 
    Text, 
    Form, 
    Item, 
    Input, 
    Label, 
    Picker, 
    Button, 
    Icon 
} from "native-base"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as productActions from '../../actions/ProductActions'
import { getListCategoriesByCondition } from '../../actions/CategoryActions'

const { width, height } = Dimensions.get('window')

export class ProductCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            regular_price: 0,
            sku: "",
            selected2: undefined
        };
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.onValueChange2 = this.onValueChange2.bind(this)
        this.fetchListCategories = this.fetchListCategories.bind(this)
    }

    componentDidMount(){
        // fetch list categories
        this.fetchListCategories()
    }

    handleSubmitForm = (price, name) => {
        alert(name)
    }

    fetchListCategories(){
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
            default:
                this.setState({
                    sku: text
                })
                break;
        }
        console.log(text)
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
                        <Item fixedLabel rounded>
                            <Label>Tên sản phẩm</Label>
                            <Input />
                        </Item>
                        <Item fixedLabel last rounded>
                            <Label>SKU</Label>
                            <Input />
                        </Item>
                        <Item picker rounded>
                            <Label>Danh mục</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select your SIM"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected2}
                                onValueChange={(value) => this.onValueChange2(value)}
                            >
                                {
                                    (this.props.categories.collection.length > 0) 
                                    ?
                                    (
                                        this.props.categories.collection.map(function(cat, i){
                                            return (<Picker.Item label={cat.name} value={cat.id} key={"cat_"+i}/>)
                                        })
                                    )
                                    :
                                    null 
                                }
                            </Picker>
                        </Item>

                        <Item fixedLabel rounded>
                            <Label>Thương hiệu</Label>
                            <Input />
                        </Item>

                        <Item fixedLabel rounded>
                            <Label>Giá bán</Label>
                            <Input />
                        </Item>

                        <Button full rounded success onPress={() => this.handleSubmitForm}>
                            <Text>Primary</Text>
                        </Button>
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
