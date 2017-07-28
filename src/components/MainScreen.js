import React from 'react';
import {Image, Dimensions} from 'react-native';
import {
    Container,
    Header,
    View,
    Content,
    Text,
    Button,
    Icon,
    Left,
    Right,
    Body,
    Item,
    Input,
    Card,
    CardItem,
    List,
    ListItem,
    Thumbnail,
    Spinner

} from "native-base";
import {HOME} from '../router'

const device = Dimensions.get('window');
const logo = require("../../images/shadow.png");
const API = 'https://jsonblob.com/api/jsonBlob/5fe3a887-70bb-11e7-9e0d-8d0ef0a54cdd';

class MainScreen extends React.Component {

    state = {
        data: [],
        isLoading: true,
        value: '',
        first: true,
    };

    static navigationOptions = {
        header: null,
    };

    checkEvent(code) {
        fetch(API + code)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 'true') {
                    this.props.navigation.navigate(HOME, {
                        id: code,
                        name: responseJson.events.name
                    });
                } else
                    this.getEventList(code);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getEventList(name) {
        return fetch(API)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    data: responseJson.events,
                    isRefreshing: !this.state.isRefreshing
                }, function () {
                    console.log(responseJson)
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _handlePressSearch(value) {
        // TODO direk arama kosulunu duzenle
        if (value.length === 120)
            this.checkEvent(value);
        else
            this.getEventList(value);
    }

    renderStart() {
        let searchSpin = false;
        let color = 'blue';
        return (
            <Content>
                <Image source={logo} style={{
                    flex: 1,
                    width: device.width,
                    height: device.height,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View>
                        <Item rounded last style={{borderColor: color,width:device.width-20}}>
                            <Icon active name={"search"} style={{color: color}}/>
                            <Input style={{color: color }} placeholder="örn: JavaDay, 512"
                                   onChangeText={(text) => this.setState({value: text})}
                                   value={this.state.value}/>
                        </Item>
                        <Button primary rounded
                                style={{
                                    marginTop: 20,
                                    alignSelf: 'center'
                                }}
                                onPress={this.state.value === "" ? null : () => {
                                    searchSpin = true;
                                    this._handlePressSearch(this.state.value);
                                    this.setState({first: false});
                                }}>
                            {searchSpin ? <Spinner color='orange'/> : <Text>Bul</Text>}
                        </Button>
                    </View>
                </Image>
            </Content>
        )
    }

    renderSeacrh() {
        let color = 'white';
        return (
            <Container>
                <Header style={{padding: 2}}>
                    <Body style={{flexDirection: 'row', flex: 1, padding:2}}>
                    <Item rounded last style={{borderColor: color,flex: 1}}>
                        <Icon active name={"search"} style={{color: color,flex:.1}}/>
                        <Input style={{color: color , flex: .8}}
                               placeholder="örn: JavaDay, 512"
                               onChangeText={(text) => this.setState({value: text})}
                               value={this.state.value}/>
                        <Button rounded transparent light style={{justifyContent: 'center',flex:.1,alignItems:'center'}}
                                onPress={this.state.value === "" ? null : () => {
                                    this._handlePressSearch(this.state.value);
                                }}>
                            <Text style={{color: color,textAlign:'center',textAlignVertical:'center'}}>Bul</Text>
                        </Button>
                    </Item>
                    </Body>
                </Header>
                <Content>
                    <List dataArray={this.state.data}
                          renderRow={(item) => this.renderRow(item)}>
                    </List>
                </Content>
            </Container>
        )
    }

    renderRow(event) {
        return (
            <ListItem button onPress={() =>
                this.props.navigation.navigate(HOME, {
                    id: event.id,
                    name: event.name
                })}>
                <Left>
                    <Thumbnail source={{uri: event.logo}}/>
                    <Body>
                    <Text>{event.name}</Text>
                    <Text note>{event.date}</Text>
                    </Body>
                </Left>
                <Right>
                    <Text>{event.id}</Text>
                    <Icon name="arrow-forward"/>
                </Right>
            </ListItem>
        )
    }


    _first() {
        return (
            <Container style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#FBFAFA',
            }}>
                <Content>
                    <Image source={logo} style={{
                        flex: 1,
                        width: device.width,
                        height: device.height,
                    }}>
                        <View style={{
                            flex: 1,
                            marginTop: device.height / 2.75,
                            paddingTop: 20,
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingBottom: 120,
                            bottom: 0,
                        }}>
                            <Item rounded last>
                                <Icon active name={"search"}/>
                                <Input placeholder="örn: JavaDay, 512"
                                       onChangeText={(text) => this.setState({value: text})}
                                       value={this.state.value}/>
                            </Item>
                            <Button primary rounded
                                    style={{
                                        marginTop: 20,
                                        alignSelf: 'center'
                                    }}
                                    onPress={this.state.value === "" ? null : () => {
                                        this.setState({first: false});
                                        this.getEventList(this.state.value)
                                    }}
                            >
                                <Text>Bul</Text>
                            </Button>
                        </View>
                    </Image>
                </Content>
            </Container>
        );
    }

    _search() {
        return (
            <Content>
                <Card>
                    <CardItem>
                        <Body style={{flexDirection: 'row', flex: 1}}>
                        <Item rounded last style={{flex: .9}}>
                            <Icon active name={"search"}/>
                            <Input placeholder="örn: JavaDay, 512"
                                   onChangeText={(text) => this.setState({value: text})}
                                   value={this.state.value}/>
                        </Item>
                        <Button primary rounded style={{flex: .1, alignSelf: 'center', marginLeft: 5}}
                                onPress={this.state.value === "" ? null : () => {
                                    this.getEventList(this.state.value)
                                }}><Text>Bul</Text></Button>
                        </Body>
                    </CardItem>
                </Card>
                <Card>
                    <List dataArray={this.state.data}
                          renderRow={(item) =>
                              <ListItem button onPress={() =>
                                  this.props.navigation.navigate(HOME, {
                                      id: item.id,
                                      name: item.name
                                  })}>
                                  <Left>
                                      <Thumbnail source={{uri: item.logo}}/>
                                      <Body>
                                      <Text>{item.name}</Text>
                                      <Text note>{item.date}</Text>
                                      </Body>
                                  </Left>
                                  <Right>
                                      <Text>{item.id}</Text>
                                      <Icon name="arrow-forward"/>
                                  </Right>
                              </ListItem>
                          }>
                    </List>
                </Card>
            </Content>
        );
    }

    render() {
        return (
            <Container>
                {this.state.first ? this.renderStart() : this.renderSeacrh()}
            </Container>)

    }
}

export default MainScreen;