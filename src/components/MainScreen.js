import React from 'react';
import {StyleSheet, Image, ActivityIndicator, Dimensions} from 'react-native';
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
    Thumbnail

} from "native-base";
import {HOME} from '../router'

const device = Dimensions.get('window');
const styles = StyleSheet.create({
});

const logo = require("../../images/shadow.png");

class MainScreen extends React.Component {

    state = {
        data: [],
        isLoading: true,
        value: '',
        first: true,
        isRefreshing: true
    };

    static navigationOptions = {
        header: null,
    };

    getEventList(name) {
        return fetch('https://jsonblob.com/api/jsonBlob/5fe3a887-70bb-11e7-9e0d-8d0ef0a54cdd')
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
                                      name : item.name
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
        return <Container>
            {this.state.first ? this._first() : this._search()}
        </Container>
    }
}


export default MainScreen;