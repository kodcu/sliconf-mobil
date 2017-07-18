import React, {Component} from "react";
import {Image} from "react-native";
import {
    Container,
    Header,
    View,
    Title,
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

import styles from "./styles";

const logo = require("../../../images/shadow.png");

var DATAS = [
    {title: 'Javaday Bükreş', year: '20 Mayıs 2018', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
    {title: 'Javaday İstanbul 2018', year: '4 Mayıs 2018', posters: {thumbnail: '../../images/javaday2.png'}},
    {title: 'Meet up Java', year: '20 gün sonra', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

class Main extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            first: true,
            data:[]
        };

    }

    _searchData() {
        var searchResultsArray = [];
        var val = this.state.value;
        DATAS.forEach(function (item) {
            if (item.title.toLowerCase().contains(val.toLowerCase()))
                searchResultsArray.push(item)
        });
        this.setState({data: searchResultsArray })
    }

    _first() {
        return (

            <View style={styles.container}>
                <Content>
                    <Image source={logo} style={styles.shadow}>
                        <View style={styles.bg}>
                            <Item rounded last>
                                <Icon active name={"search"}/>
                                <Input placeholder="örn: JavaDay, 512"
                                       onChangeText={(text) => this.setState({value: text})}
                                       value={this.state.value} />
                            </Item>
                            <Button primary rounded
                                style={styles.btn}
                                onPress={this.state.value === "" ? null : ()=> {this.setState({ first:false}); this._searchData()}}
                            >
                                <Text>Ara</Text>
                            </Button>
                        </View>
                    </Image>
                </Content>
            </View>

        );
    }

    _search() {
        return (

            <Content>
                <Card>
                    <CardItem>
                        <Body style={{flexDirection:'row',flex:1}}>
                        <Item rounded last style={{flex:.9}}>
                            <Icon active name={"search"}/>
                            <Input placeholder="örn: JavaDay, 512"
                                   onChangeText={(text) => this.setState({value: text})}
                                   value={this.state.value} />
                        </Item>
                        <Button primary rounded style={{flex:.1,alignSelf:'center',marginLeft:5}}
                                onPress={this.state.value === "" ? null : ()=> {this._searchData()}} ><Text>Bul</Text></Button>
                        </Body>
                    </CardItem>
                </Card>
                <Card>
                    <List dataArray={this.state.data}
                          renderRow={(item) =>
                              <ListItem button onPress={() =>
                                  this.props.navigation.navigate("Home", {
                                      name: item.title
                                  })}>
                                  <Left>
                                      <Thumbnail source={require('../../../images/javaday2.png')} />
                                      <Body>
                                      <Text>{item.title}</Text>
                                      <Text note>{item.year}</Text>
                                      </Body>
                                  </Left>
                                  <Right>
                                      <Icon name="arrow-forward" />
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
                {this.state.first ? this._first() : this._search()}
            </Container>

        );
    }
}

export default Main;
