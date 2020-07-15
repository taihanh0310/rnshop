import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View, ListView,
    TextInput,
    ActivityIndicator,
    Alert,
    SafeAreaView,
    Image, 
    FlatList,
    TouchableOpacity,
    Dimensions
} from 'react-native';
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
} from 'native-base';


export default class ProductMainView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            search: '',
            serverData: [],
            //Data Source for the FlatList
            fetching_from_server: false,
            //Loading state used while loading more data
        }
        this.arrayholder = [];
        //Index of the offset to load from web API
        this.page = 1;
    }

    setupAPI(page) {
        fetch('https://annhienstore.herokuapp.com/api/v1/products?page=' + page)
            //Sending the currect offset with get request
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson.data.rows);
                //Successful response from the API Call 
                this.offset = this.offset + 1;
                //After the response increasing the offset for the next API call.
                this.setState({
                    serverData: [...this.state.serverData, ...responseJson.data.rows],
                    //adding the new data with old one available in Data Source of the List
                    isLoading: false,
                    //updating the loading state to false
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    loadMoreData() {
        //On click of Load More button We will call the web API again
        this.setState({ fetching_from_server: true }, () => {
            this.offset = this.offset + 1;
            this.setupAPI(this.offset);
        });
    }

    componentDidMount() {
        this.setupAPI(this.page);
    }

    updateSearch = (search) => {
        this.setState({ search });
    }

    renderFooter() {
        return (
          //Footer View with Load More button
          <View style={styles.footer}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={this.loadMoreData}
              //On Click of button calling loadMoreData function to load more data
              style={styles.loadMoreBtn}>
              <Text style={styles.btnText}>Load More</Text>
              {this.state.fetching_from_server ? (
                <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
              ) : null}
            </TouchableOpacity>
          </View>
        );
      }

    renderItem(product){

    }

    render() {
        const { search } = this.state;
        console.log(this.state.isLoading);
        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input
                            placeholder="Search"
                            onChangeText={this.updateSearch}
                            value={search}
                            autoCapitalize="none"
                        />
                        <Icon name="ios-people" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <View style={{paddingBottom: 20, height: Math.round(Dimensions.get('window').height) - 70}}>
                { this.state.isLoading 
                    ? 
                    (
                        <Spinner color='red' />
                    ) 
                    : 
                    (
                     <FlatList
                        data={this.state.serverData}
                        renderItem={({ item, index }) => (
                            <View style={styles.item}>
                              <Text style={styles.text}>
                                {item.id}
                                {'.'}
                                {item.name.toUpperCase()}
                              </Text>
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                        style={{ width: '100%', marginBottom: 30 }}
                        keyExtractor={(item, index) => index}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        ListFooterComponent={this.renderFooter.bind(this)}
                     >

                     </FlatList>   
                    )
                }
                </View>
            </Container>
        );
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
  