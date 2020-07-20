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
  Dimensions, 
  Vibration
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

import { RNCamera } from 'react-native-camera';

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
      torchOn: false,
      isCameraVisiable: false,
      textButtonCamera: "Open Camera"
    }
    this.arrayholder = [];
    //Index of the offset to load from web API
    this.page = 1;
    this.loadMoreData = this.loadMoreData.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.searchResult = this.searchResult.bind(this);
    // this.handleTourch = this.handleTourch.bind(this);
    this.onBarCodeRead = this.onBarCodeRead.bind(this);
    this.showCameraView = this.showCameraView.bind(this);
  }

  setupAPI(page) {
    fetch('https://annhienstore.herokuapp.com/api/v1/products?page=' + page)
      //Sending the currect offset with get request
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.data.rows);
        //Successful response from the API Call 
        this.page = this.page + 1;
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
    alert("load more");
    //On click of Load More button We will call the web API again
    this.setState({
      isLoading: true,
      search: ''
    });
    this.setupAPI(this.page);
  }

  componentDidMount() {
    // this.setupAPI(this.page);
  }

  updateSearch = (search) => {
    this.setState({ search });
    if (search.length >= 3) {
      this.searchResult(search);
      // alert("search ne");
    }
  }

  searchResult = (search) => {
    this.setState({
      isLoading: true
    });

    fetch('https://annhienstore.herokuapp.com/api/v1/products/search?seach=' + search)
      //Sending the currect offset with get request
      .then(response => response.json())
      .then(responseJson => {
        console.warn(search);
        //Successful response from the API Call 
        //After the response increasing the offset for the next API call.
        this.setState({
          serverData: [...this.state.serverData, ...responseJson.data.data.rows],
          //adding the new data with old one available in Data Source of the List
          isLoading: false,
          //updating the loading state to false
        });
      })
      .catch(error => {
        console.warn(error);
      });
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

  renderItem(product) {

  }
  handleTourch(value) {
    if (value === true) {
      this.setState({ torchOn: false });
    } else {
      this.setState({ torchOn: true });
    }
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
    const { search, isCameraVisible, textButtonCamera  } = this.state;
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Search"
              onChangeText={(text) => this.updateSearch(text)}
              value={search}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              autoFocus={false}
              disableFullscreenUI={false}
            />
            <Icon name="ios-people" />
          </Item>
          <Button transparent onPress={this.searchResult}>
            <Text>Search</Text>
          </Button>
        </Header>
        <View style={{ paddingBottom: 20, height: Math.round(Dimensions.get('window').height) - 70, display:'flex', justifyContent:'center', alignContent:'center' }}>
          {
            (isCameraVisible) 
            ? 
            (
              <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              onBarCodeRead={this.onBarCodeRead}
              style={{ flex: 0.5, width: '50%', borderWidth:1, justifyContent:'center', alignContent:'center' }}
            >
              <Text style={{ backgroundColor: 'white' }}>BARCODE SCANNER</Text>
            </RNCamera>
            ) : null  
          }
          <Button onPress={this.showCameraView}>
            <Text>{textButtonCamera}</Text>
          </Button>
          
          {/* { this.state.isLoading 
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
                } */}

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
