import React, { Component } from 'react'
import { View } from 'react-native'
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
    }

    handleSubmitForm = (id, price, name) => {
        alert(name)
        this.props.updateProductPrice(id, price, name + " update")
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
                                <Picker.Item label="Wallet" value="key0" />
                                <Picker.Item label="ATM Card" value="key1" />
                                <Picker.Item label="Debit Card" value="key2" />
                                <Picker.Item label="Credit Card" value="key3" />
                                <Picker.Item label="Net Banking" value="key4" />
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

                        <Button full rounded success>
                            <Text>Primary</Text>
                        </Button>
                </Content>
            </Container>
        )
    }
}

export default ProductCreate
